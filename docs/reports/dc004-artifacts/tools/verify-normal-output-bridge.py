from pathlib import Path
import json,gzip,urllib.request,hashlib
p=Path('/tmp/xk-dc004');before=json.loads((p/'normal-before-fix-result.json').read_text());after=json.loads((p/'normal-after-fix-result.json').read_text());source_before=json.loads((p/'source-freeze.json').read_text());source_after=json.loads((p/'source-final.json').read_text());facts=json.loads((p/'fixture-final.json').read_text())['publicFacts'];out=p/'normal-final-html';out.mkdir(exist_ok=False);rows=[]
for path,record in before['pages'].items():
 prior=gzip.decompress((p/'normal-before-html'/((path.strip('/').replace('/','__') or 'home')+'.html.gz')).read_bytes())
 with urllib.request.urlopen('http://127.0.0.1:3242'+path,timeout=30) as response:raw=response.read()
 assert hashlib.sha256(raw).hexdigest()==after['pages'][path]['rawSha256'],path
 (out/((path.strip('/').replace('/','__') or 'home')+'.html.gz')).write_bytes(gzip.compress(raw,mtime=0))
 a=prior.replace(before['buildId'].encode(),b'ACTUAL_BUILD_ID');b=raw.replace(after['buildId'].encode(),b'ACTUAL_BUILD_ID')
 if path=='/design-collection/heritage/services':
  guide=facts['services']['page']['websiteGuide'];ok=guide['description'].encode() in raw and all(('/design-collection/heritage'+guide[k]['href']).encode() in raw for k in ['samplesLink','showcasesLink']);rows.append({'path':path,'status':'PASS' if ok else 'FAIL','category':'AFFECTED_GUIDE','expected':'New source-equivalent guide and two resolver links. Full affected layout/axe/link tests required separately.'});continue
 if path.startswith('/design-collection/heritage/portfolio/showcases/'):
  slug=path.rsplit('/',1)[1];entry=next(v for v in facts['portfolio']['websiteShowcases'] if v['id']==slug);old=f'開啟展示網站來源：{entry["title"]}（另開分頁）'.encode();new=(entry['href']+'，').encode()+old
  counts=[a.count(old),b.count(new)];assert counts==[2,2],(path,counts)
  ok=a.replace(old,new)==b;rows.append({'path':path,'status':'PASS' if ok else 'FAIL','category':'EXACT_ARIA_ONLY','oldOccurrences':counts[0],'newOccurrences':counts[1],'normalization':'Only exact one source-link aria-label in HTML and matching RSC attribute, plus actual build ID. No other strings or IDs changed.'})
 else:rows.append({'path':path,'status':'PASS' if a==b else 'FAIL','category':'UNCHANGED_HTML'})
assets=before['assets']==after['assets'];ok=assets and len(rows)==33 and all(r['status']=='PASS' for r in rows)
result={'status':'PASS' if ok else 'FAIL','beforeSourceSha256':source_before['sha256'],'afterSourceSha256':source_after['sha256'],'actualCodeDiff':source_after['changesAfterFirstNormal'],'rawCaptureMetadataBoundary':'Both capture helper outputs retain their original baseline source label. This audit binds before to source-freeze.json and the fresh final-build server to source-final.json; it does not relabel v1 tests as rerun.','runtimeAssets':len(before['assets']),'runtimeAssetsRawHashEqual':assets,'rows':rows,'applicability':'Retain unmodified v1 behavior/PDF/layout cases only with this bridge. Rerun Services affected cases, 18 brand axe cases, and a fresh final normal network/lifecycle probe. v1 raw network and axe FAIL remain unchanged.'}
(p/'normal-output-bridge-result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'status':result['status'],'assets':result['runtimeAssets'],'unchangedHTML':sum(r['category']=='UNCHANGED_HTML' for r in rows),'exactAriaOnly':sum(r['category']=='EXACT_ARIA_ONLY' for r in rows),'affectedGuide':sum(r['category']=='AFFECTED_GUIDE' for r in rows)},ensure_ascii=False));raise SystemExit(0 if ok else 1)
