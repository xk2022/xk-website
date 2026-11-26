import ast
import importlib.util
import json
from pathlib import Path
from types import SimpleNamespace

root = Path('/workspace/xk-website')
spec = importlib.util.spec_from_file_location('smoke', root / 'scripts/smoke-website.py')
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)
suite = smoke.Smoke(SimpleNamespace(base_url='http://127.0.0.1:9/', timeout=1, check_external=False, check_source_assets=False, output='/tmp/xk-dc004/not-used.json'))
assert suite.source_contract()
assert not [x for x in suite.results if x['status'] == 'FAIL'], [x for x in suite.results if x['status'] == 'FAIL']
assert len(suite.public_pages) == 33
for source in ['contact', 'quotation']:
    html = Path('/tmp/xk-dc003/baseline-site', source, 'index.html').read_text()
    doc = smoke.Document(html).root
    for path in ['/' + source, '/design-collection/heritage/' + source]:
        suite.results = []
        suite.enquiry_markup(path, doc)
        assert not [x for x in suite.results if x['status'] == 'FAIL'], (path, [x for x in suite.results if x['status'] == 'FAIL'])
    for path in ['/about', '/design-collection/heritage/about', '/design-collection/luxury/' + source, '/design-collection/heritage/' + source + '/extra']:
        suite.results = []
        suite.enquiry_markup(path, doc)
        assert [x for x in suite.results if x['status'] == 'FAIL'], path
    suite.results = []
    invalid = html.replace('<form ', '<form action="https://invalid.example/receive" ', 1) if source == 'contact' else html.replace('/images/quotation/website-qr.svg', '/xk-website/images/quotation/website-qr.svg')
    suite.enquiry_markup('/design-collection/heritage/' + source, smoke.Document(invalid).root)
    assert [x for x in suite.results if x['status'] == 'FAIL']

def metadata_html(page, canonical, og):
    e = lambda text: text.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;')
    meta = [('name', 'description', page['description']), ('property', 'og:title', page['title']), ('property', 'og:description', page['description']), ('property', 'og:url', og), ('property', 'og:site_name', suite.data['siteConfig']['name']), ('property', 'og:locale', 'zh_TW'), ('property', 'og:type', 'website'), ('name', 'twitter:card', 'summary'), ('name', 'twitter:title', page['title']), ('name', 'twitter:description', page['description']), ('name', 'robots', 'noindex, nofollow')]
    head = '<title>' + e(page['title']) + '</title><link rel="canonical" href="' + e(canonical) + '">' + ''.join('<meta ' + key + '="' + e(name) + '" content="' + e(value) + '">' for key, name, value in meta)
    ld = {'@context': 'https://schema.org', '@type': 'WebSite', 'name': suite.data['siteConfig']['name'], 'url': suite.data['siteConfig']['url'] + '/', 'inLanguage': 'zh-TW'}
    return '<html lang="zh-TW"><head>' + head + '</head><body><script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + '</script></body></html>'

origin = 'https://www.xplorekaleidoscope.com'
for route in suite.design_contract['heritageRoutes']:
    page = next(page for page in suite.public_pages if page['path'] == route['path'])
    canonical = origin + route['canonicalPath']
    og = origin + route['path']
    suite.results = []
    suite.metadata(route['path'], smoke.Document(metadata_html(page, canonical, og)).root)
    assert not [x for x in suite.results if x['status'] == 'FAIL']
    for bad_canonical, bad_og in [(og, og), (canonical, canonical)]:
        suite.results = []
        suite.metadata(route['path'], smoke.Document(metadata_html(page, bad_canonical, bad_og)).root)
        assert [x for x in suite.results if x['status'] == 'FAIL']
print('PASS: exact 33 source contracts; both Contact and Quotation presentation paths retain narrow SSR control gates; unknown/Luxury/suffix form bypasses rejected; all 16 Heritage canonical/OG positive and swapped-target negatives. No HTTP/server/build.')
