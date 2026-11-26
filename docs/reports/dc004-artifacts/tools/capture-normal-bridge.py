from pathlib import Path
import json,hashlib,urllib.request,re,sys
r=Path.cwd();p=Path(sys.argv[1]);assert not p.exists();bid=(r/'.next/BUILD_ID').read_text().strip();fixture=json.loads((r/'scripts/fixtures/design-collection-contract.json').read_text());h=lambda b:hashlib.sha256(b).hexdigest();pages={}
for route in fixture['publishedPaths']:
 with urllib.request.urlopen('http://127.0.0.1:3242'+route,timeout=30) as response:raw=response.read()
 pages[route]={'rawSha256':h(raw),'buildIdNormalizedSha256':h(raw.replace(bid.encode(),b'ACTUAL_BUILD_ID')),'bytes':len(raw)}
assets={re.sub(r'^([^/]+)/(_(?:ssgManifest|clientMiddlewareManifest|buildManifest)\.js)$',r'ACTUAL_BUILD_ID/\2',str(f.relative_to(r/'.next/static'))):h(f.read_bytes()) for f in (r/'.next/static').rglob('*') if f.is_file()}
p.write_text(json.dumps({'buildId':bid,'pages':pages,'assets':assets,'source':'source-freeze.json','normalization':'Only exact observed build ID string, no DOM/copy/React ID/asset-content changes normalized'},indent=2)+'\n');print({'pages':len(pages),'assets':len(assets),'file':str(p)})
