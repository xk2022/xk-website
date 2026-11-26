import importlib.util
import io
import json
from pathlib import Path
import tarfile
import zipfile

root=Path('/tmp/xk-dc004')
spec=importlib.util.spec_from_file_location('checker',root/'inspect-ci-artifact.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
files=m.read_directory(Path('/workspace/xk-website/out'))
results=[]
def test(name,data,expected):
 report=m.inspect(data)
 actual=report['status']
 results.append({'item':name,'expected':expected,'actual':actual,'status':'PASS' if actual==expected else 'FAIL','rejectedAssertions':[x['item'] for x in report['failures']]})

test('Unmodified frozen local output',files,'PASS')
h='design-collection/heritage/about/index.html'
for label,old,new in [
 ('Reject Heritage canonical self instead of Modern',b'<link rel="canonical" href="https://www.xplorekaleidoscope.com/about/"',b'<link rel="canonical" href="https://www.xplorekaleidoscope.com/design-collection/heritage/about/"'),
 ('Reject Heritage OG Modern instead of presentation self',b'<meta property="og:url" content="https://www.xplorekaleidoscope.com/design-collection/heritage/about/"',b'<meta property="og:url" content="https://www.xplorekaleidoscope.com/about/"')]:
 if old not in files[h]: raise AssertionError('Fixture target absent: '+label)
 mutated=dict(files);mutated[h]=mutated[h].replace(old,new,1);test(label,mutated,'FAIL')
mutated=dict(files);mutated[h]=mutated[h].replace(b'</body>',b'<main id="duplicate"></main></body>',1);test('Reject duplicate landmark',mutated,'FAIL')
mutated=dict(files);mutated['design-collection/luxury/index.html']=files['index.html'];test('Reject extra planned Luxury HTML',mutated,'FAIL')
js=next(name for name in files if name.endswith('.js') and '/chunks/' in name)
mutated=dict(files);mutated[js]+=b'\n/*different runtime bytes*/';test('Reject runtime byte drift',mutated,'FAIL')
mutated=dict(files);mutated[js]+='\n/*草案，尚未核准生效*/'.encode();test('Reject private draft leaked in JS',mutated,'FAIL')
font=next(name for name in files if name.endswith('.woff2'))
mutated=dict(files);del mutated[font];test('Reject missing referenced/font runtime asset',mutated,'FAIL')
old_id=m.build_id(files)
mutated={name.replace('/'+old_id+'/', '/different-real-build-id/') if name.startswith('_next/static/'+old_id+'/') else name:data for name,data in files.items()}
test('Accept manifest directory change for actual BuildID only, with unchanged raw manifest bytes',mutated,'PASS')
mutated=dict(files);path=next(name for name in files if name.endswith('/_buildManifest.js'));mutated[path]+=b' ';test('Reject manifest byte drift despite permitted directory normalization',mutated,'FAIL')
# The safe reader rejects traversal and links before extracting anything.
for label,member in [('Reject TAR traversal','../escape'),('Reject TAR symlink','bad-link')]:
 buf=io.BytesIO()
 with tarfile.open(fileobj=buf,mode='w') as tar:
  info=tarfile.TarInfo(member)
  if member=='bad-link': info.type=tarfile.SYMTYPE;info.linkname='/tmp/outside'
  else: info.size=1
  tar.addfile(info,None if member=='bad-link' else io.BytesIO(b'x'))
 z=root/(member.replace('/','_')+'.zip')
 with zipfile.ZipFile(z,'w') as archive: archive.writestr('artifact.tar',buf.getvalue())
 try: m.read_zip(z);actual='ACCEPTED'
 except ValueError: actual='REJECTED'
 results.append({'item':label,'expected':'REJECTED','actual':actual,'status':'PASS' if actual=='REJECTED' else 'FAIL'})
status='PASS' if all(row['status']=='PASS' for row in results) else 'FAIL'
record={'status':status,'cases':results,'caseCount':len(results),'checkerSha256':m.sha((root/'inspect-ci-artifact.py').read_bytes()),'scope':'Offline checker fixtures only; no app build/browser/HTTP/CI execution'}
(root/'artifact-checker-selftest.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(record,ensure_ascii=False))
raise SystemExit(0 if status=='PASS' else 1)
