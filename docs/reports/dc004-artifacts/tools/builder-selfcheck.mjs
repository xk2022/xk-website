import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { quotationCatalog } from '/workspace/xk-website/src/config/quotation.ts';
import { siteConfig } from '/workspace/xk-website/src/config/site.ts';
import { seoPages } from '/workspace/xk-website/src/config/seo.ts';
import * as seo from '/workspace/xk-website/src/lib/seo.ts';
import { pagesDeployment } from '/workspace/xk-website/src/config/deployment.ts';
const source = readFileSync('/workspace/xk-website/scripts/build-github-pages.mjs', 'utf8');
const fixture = name => JSON.parse(readFileSync('/workspace/xk-website/scripts/fixtures/' + name + '-contract.json', 'utf8'));
const designContract = fixture('design-collection'), contactContract = fixture('contact'), quotationContract = fixture('quotation');
const names = ['contentPathFor', 'presentationHref', 'tagAttribute', 'metadataAttribute', 'verifyBrandUrl', 'verifySeoMetadata', 'decodePublicText', 'htmlAttributes', 'verifyMailtoHref', 'verifyContactDraftForm', 'verifyQuotationMarkup', 'verifyEnquiryMarkup'];
const definitions = names.map(name => { const match = source.match(new RegExp('^function ' + name + '\\([\\s\\S]*?^}', 'm')); assert(match, name); return match[0]; }).join('\n');
const functions = new Function('assert', 'designContract', 'contactContract', 'quotationContract', 'quotationCatalog', 'siteConfig', 'seo', 'basePath', 'pagesDeployment', definitions + '\nreturn {' + names.join(',') + '};')(assert, designContract, contactContract, quotationContract, quotationCatalog, siteConfig, seo, '', pagesDeployment);
for (const type of ['contact', 'quotation']) {
  const html = readFileSync('/tmp/xk-dc003/baseline-site/' + type + '/index.html', 'utf8');
  for (const path of ['/' + type, '/design-collection/heritage/' + type]) functions.verifyEnquiryMarkup(html, path, functions.contentPathFor(path));
  for (const path of ['/about', '/design-collection/heritage/about', '/design-collection/luxury/' + type, '/design-collection/heritage/' + type + '/extra']) assert.throws(() => functions.verifyEnquiryMarkup(html, path, functions.contentPathFor(path)));
}
const e = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
function document(page, canonical, og) {
  const values = [['name', 'description', page.description], ['property', 'og:title', page.title], ['property', 'og:description', page.description], ['property', 'og:url', og], ['property', 'og:site_name', siteConfig.name], ['property', 'og:locale', 'zh_TW'], ['property', 'og:type', 'website'], ['name', 'twitter:card', 'summary'], ['name', 'twitter:title', page.title], ['name', 'twitter:description', page.description], ['name', 'robots', 'noindex, nofollow']];
  return '<head><title>' + e(page.title) + '</title><link rel="canonical" href="' + canonical + '">' + values.map(([key, name, value]) => '<meta ' + key + '="' + name + '" content="' + e(value) + '">').join('') + '</head><script type="application/ld+json">' + JSON.stringify(seo.createWebsiteJsonLd(siteConfig)) + '</script>';
}
for (const route of designContract.heritageRoutes) {
  const page = seoPages.find(({ path }) => path === route.path);
  const canonical = new URL(route.canonicalPath, siteConfig.url).href, og = new URL(route.path, siteConfig.url).href;
  functions.verifySeoMetadata(document(page, canonical, og), page, route.path);
  assert.throws(() => functions.verifySeoMetadata(document(page, og, og), page, route.path));
  assert.throws(() => functions.verifySeoMetadata(document(page, canonical, canonical), page, route.path));
}
console.log('PASS: actual builder helper functions retain exact Contact/Quotation two-style whitelist, reject unknown style/suffix bypasses, and validate all 16 Heritage canonical/OG pairs and swapped-target negative fixtures. Builder not executed.');
