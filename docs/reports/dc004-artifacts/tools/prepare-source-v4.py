from pathlib import Path
import json,hashlib,copy
from datetime import datetime,timezone
root=Path('/tmp/xk-dc004');repo=Path('/workspace/xk-website');source=root/'source-final-v3.json';contract=root/'contract-final-v3.json';out=root/'source-final-v4.json';cout=root/'contract-final-v4.json';receipt=root/'source-v4-verification.json'
assert not out.exists() and not cout.exists() and not receipt.exists(),'Never overwrite versioned evidence'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def fingerprint(files):return hashlib.sha256(''.join(f'{k}\0{v}\n' for k,v in sorted(files.items())).encode()).hexdigest()
d=json.loads(source.read_text());c=json.loads(contract.read_text());assert len(d['files'])==197;assert fingerprint(d['files'])==d['sha256'];assert c['rootFingerprint']==d['sha256'];actual={};missing=[]
for name in d['files']:
 p=repo/name
 if not p.is_file():missing.append(name)
 else:actual[name]=sha(p)
changed=[{'path':name,'before':value,'actual':actual.get(name)} for name,value in d['files'].items() if actual.get(name)!=value]
assert not missing,missing
assert [x['path'] for x in changed]==['scripts/build-github-pages.mjs'],changed
fixture=root/'fixture-final.json';catalog=root/'catalog-final.json';expected={'fixture-final.json':'9b32d4877e9d0e8b9e698b6e4002bf9a6349ec07ffe2234c26bceab560b90eca','catalog-final.json':'1c4ad0dc46e4d8efbce773fc630a4fc8c5bc57d0c29b0744a0608888c894dd63'}
for name,value in expected.items():assert sha(root/name)==value,name+' changed'
v4=copy.deepcopy(d);v4['files']=actual;v4['sha256']=fingerprint(actual);v4['changesAfterNormalV3']=['scripts/build-github-pages.mjs'];v4['versionBridge']={'from':'/tmp/xk-dc004/source-final-v3.json','fromFileSha256':sha(source),'fromFingerprint':d['sha256'],'scope':'Pages builder gallery trailingSlash only; every one of the197 original inventory files was read and hashed;196 unchanged, only authorized builder differs. App/fixture/catalog unchanged.'}
c4=copy.deepcopy(c);c4['sourceFreeze']=str(out);c4['rootFingerprint']=v4['sha256']
out.write_text(json.dumps(v4,ensure_ascii=False,indent=2)+'\n');cout.write_text(json.dumps(c4,ensure_ascii=False,indent=2)+'\n')
# Re-read both manifests and all197 files after write to verify the seal against actual bytes.
assert json.loads(out.read_text())['sha256']==fingerprint({name:sha(repo/name) for name in d['files']})
assert json.loads(cout.read_text())['rootFingerprint']==v4['sha256']
r={'testId':'DC004-SOURCE-V4-BUILDER-ONLY-SEAL','status':'PASS','verifiedAt':datetime.now(timezone.utc).isoformat(),'filesReadAndHashed':197,'unchangedFiles':196,'changedFiles':changed,'missingFiles':missing,'v3':{'sourcePath':str(source),'sourceFileSha256':sha(source),'contractPath':str(contract),'contractFileSha256':sha(contract),'fingerprint':d['sha256'],'preserved':True},'v4':{'sourcePath':str(out),'sourceFileSha256':sha(out),'contractPath':str(cout),'contractFileSha256':sha(cout),'fingerprint':v4['sha256']},'unchangedInputs':[{'path':str(root/name),'sha256':sha(root/name)} for name in expected],'scope':'Read-only source hash verification and new temporary metadata files. No build/server/browser/Git operation or app edit.'};receipt.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n');print(json.dumps(r,ensure_ascii=False))
