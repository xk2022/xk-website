from pathlib import Path
import json,gzip,urllib.request,hashlib
r=Path.cwd();out=Path('/tmp/xk-dc004/normal-before-html');out.mkdir(exist_ok=False);records=[];prior=json.loads(Path('/tmp/xk-dc004/normal-before-fix-result.json').read_text())
for path in json.loads((r/'scripts/fixtures/design-collection-contract.json').read_text())['publishedPaths']:
 with urllib.request.urlopen('http://127.0.0.1:3242'+path,timeout=30) as response:raw=response.read()
 h=hashlib.sha256(raw).hexdigest();assert h==prior['pages'][path]['rawSha256'],path
 f=out/((path.strip('/').replace('/','__') or 'home')+'.html.gz');f.write_bytes(gzip.compress(raw,mtime=0));records.append({'path':path,'file':str(f),'sha256':h})
(out/'manifest.json').write_text(json.dumps(records,indent=2)+'\n');print({'files':len(records),'priorHashesMatch':True,'manifest':str(out/'manifest.json')})
