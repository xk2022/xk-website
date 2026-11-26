from pathlib import Path
import json,gzip,hashlib,re
p=Path('/tmp/xk-dc004');before=json.loads((p/'normal-before-fix-result.json').read_text());after=json.loads((p/'normal-after-fix-result.json').read_text());facts=json.loads((p/'fixture-final.json').read_text())['publicFacts'];rows=[]
def normalized(raw,bid):return raw.replace(bid.encode(),b'ACTUAL_BUILD_ID')
def markup(raw):
 count=0
 def keep(m):
  nonlocal count
  body=m.group(1).lstrip()
  if body.startswith((b'self.__next_f.push(',b'(self.__next_f=')):
   count+=1;return b''
  return m.group(0)
 cleaned=re.sub(rb'<script\b[^>]*>(.*?)</script>',keep,raw,flags=re.S)
 assert count>0
 return cleaned,count
for path in before['pages']:
 name=(path.strip('/').replace('/','__') or 'home')+'.html.gz';a=normalized(gzip.decompress((p/'normal-before-html'/name).read_bytes()),before['buildId']);b=normalized(gzip.decompress((p/'normal-final-html'/name).read_bytes()),after['buildId'])
 if path=='/design-collection/heritage/services':
  guide=facts['services']['page']['websiteGuide'];ok=guide['description'].encode() in b and all(('/design-collection/heritage'+guide[k]['href']).encode() in b for k in ['samplesLink','showcasesLink']);rows.append({'path':path,'status':'PASS' if ok else 'FAIL','category':'AFFECTED_GUIDE','requiredFreshTests':'Five widths, new link keyboard actions and 375/1440 axe'});continue
 if path.startswith('/design-collection/heritage/portfolio/showcases/'):
  entry=next(v for v in facts['portfolio']['websiteShowcases'] if v['id']==path.rsplit('/',1)[1]);old=f'開啟展示網站來源：{entry["title"]}（另開分頁）'.encode();new=(entry['href']+'，').encode()+old
  raw_equal=a.replace(old,new)==b;ma,ca=markup(a);mb,cb=markup(b);assert ma.count(old)==1 and mb.count(new)==1
  same=ma.replace(old,new)==mb;rows.append({'path':path,'status':'PASS' if same else 'FAIL','category':'EXACT_VISIBLE_MARKUP_ARIA_ONLY','fullRscBytesEqualAfterExactLabel':raw_equal,'removedNextTransportScripts':[ca,cb],'normalization':'Only actual build ID and one exact source-link aria-label in server markup; remove only explicit Next RSC transport scripts. JSON-LD, scripts with src, all other markup/text/attributes remain. RSC payload/segmentation is not asserted equal.','requiredFreshTests':'All six rendered/hydrated pages: 375/1440 default and 375 expanded-menu axe and visible-label checks.'})
 else:rows.append({'path':path,'status':'PASS' if a==b else 'FAIL','category':'EXACT_FULL_HTML'})
assets=before['assets']==after['assets'];ok=assets and len(rows)==33 and all(v['status']=='PASS' for v in rows)
r={'status':'PASS' if ok else 'FAIL','beforeSourceSha256':json.loads((p/'source-freeze.json').read_text())['sha256'],'afterSourceSha256':json.loads((p/'source-final.json').read_text())['sha256'],'runtimeAssets':142,'runtimeRawHashEqual':assets,'rows':rows,'scope':'26 full HTML equal except actual build ID; 6 rendered server markup equal except one exact aria-label, with RSC serialization explicitly excluded and fresh hydration/axe required; 1 Services page requires affected retest. Do not relabel original 262 suite or 27 aborted requests as PASS.','priorAttempt':'normal-output-bridge-result.json is retained FAIL: full RSC serialization equality was not met. This narrower visible-markup bridge does not claim those bytes equal.'}
(p/'normal-output-bridge-v2-result.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'status':r['status'],'runtimeAssets':142,'unchangedFullHTML':sum(x['category']=='EXACT_FULL_HTML' for x in rows),'visibleAriaOnly':sum(x['category']=='EXACT_VISIBLE_MARKUP_ARIA_ONLY' for x in rows),'affectedGuide':1}));raise SystemExit(0 if ok else 1)
