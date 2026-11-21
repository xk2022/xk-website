import json,re,math
from pathlib import Path
r=json.load(open('/tmp/xk-showcase-gallery/pages-initial/result.json'))
def lum(c):return sum(k*(v/255/12.92 if v/255<=.04045 else ((v/255+.055)/1.055)**2.4)for k,v in zip([.2126,.7152,.0722],c))
def contrast(a,b):
 x,y=sorted([lum(a),lum(b)]);return(y+.05)/(x+.05)
def parse(s):
 if s.startswith('rgb'):
  v=[float(x)for x in re.findall(r'[\d.]+',s)];return v[:3],v[3]if len(v)>3 else 1
 m=re.fullmatch(r'oklab\(([-.\deE]+) ([-.\deE]+) ([-.\deE]+) / ([-.\deE]+)\)',s);assert m,s
 L,a,b,alpha=map(float,m.groups());l=(L+.3963377774*a+.2158037573*b)**3;m0=(L-.1055613458*a-.0638541728*b)**3;s0=(L-.0894841775*a-1.291485548*b)**3
 lin=[4.0767416621*l-3.3077115913*m0+.2309699292*s0,-1.2684380046*l+2.6097574011*m0-.3413193965*s0,-.0041960863*l-.7034186147*m0+1.707614701*s0];return [255*max(0,min(1,12.92*v if v<=.0031308 else 1.055*v**(1/2.4)-.055))for v in lin],alpha
def blend(f,a,b):return[x*a+y*(1-a)for x,y in zip(f,b)]
raw={}
for c in r['incomplete']:
 for item in c['items']:
  assert item['id']=='color-contrast'
  for n in item['nodes']:raw[(c['path'],c['width'],tuple(n['target']))]=n
rows=[]
for c in r['manualStyles']:
 for n in c['nodes']:
  assert not n.get('missing') and n['opacity']=='1';fg,alpha=parse(n['color']);opaque=[parse(p['background'])[0]for p in n['parents']if parse(p['background'])[1]==1];assert opaque;bg=opaque[0]
  node=raw[(c['path'],c['width'],tuple(n['selector']))];related=[v['html']for ch in node['any']for v in ch.get('relatedNodes',[])];assert len(set(related))==1;html=related[0]
  if 'brand-pattern-gradient' in html:overlay,maximum=[25,184,213],.12
  elif 'brand-pattern-kaleidoscope' in html:overlay,maximum=[49,87,213],.07
  else:raise ValueError(html)
  # A channel-wise interval covers every position/mask/alpha of the actual
  # related decorative layer, without incorrectly adding other sections' art.
  end=blend(overlay,maximum,bg);low=[min(a,b)for a,b in zip(bg,end)];high=[max(a,b)for a,b in zip(bg,end)]
  ratio=min(contrast(blend(fg,alpha,b),b)for b in [low,high]);threshold=3 if float(n['fontSize'][:-2])>=24 or(float(n['fontSize'][:-2])>=18.66 and int(n['fontWeight'])>=700)else 4.5
  rows.append({'path':c['path'],'width':c['width'],'selector':n['selector'],'text':n['text'],'foreground':n['color'],'opaqueBackground':bg,'relatedDecoration':html,'maximumOverlayAlpha':maximum,'minimumRatio':ratio,'requiredRatio':threshold,'status':'PASS'if ratio>=threshold else'FAIL'})
assert len(rows)==len(raw)==302
out={'status':'PASS'if all(x['status']=='PASS'for x in rows)else'FAIL','nodes':len(rows),'minimumRatio':min(x['minimumRatio']for x in rows),'method':'Fresh current Pages styles and axe related decorative element. Per-node actual gradient maximum alpha12% or kaleidoscope7%, masks can only reduce it. Channel bounds and WCAG luminance with exact Oklab-to-sRGB conversion. Not all-section overlay stacking, glyph pixel certification, or a full WCAG audit.','rows':rows}
Path('/tmp/xk-showcase-gallery/manual-contrast.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items()if k!='rows'});assert out['status']=='PASS'
