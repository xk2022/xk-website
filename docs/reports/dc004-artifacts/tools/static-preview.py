import argparse,functools,pathlib
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
p=argparse.ArgumentParser();p.add_argument('--port',type=int,required=True);p.add_argument('--directory',required=True);a=p.parse_args()
root=pathlib.Path(a.directory).resolve()
class PagesPreview(SimpleHTTPRequestHandler):
 def send_error(self,code,message=None,explain=None):
  custom=root/'404.html'
  if code!=404 or not custom.is_file():return super().send_error(code,message,explain)
  payload=custom.read_bytes();self.send_response(404);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(payload)));self.end_headers()
  if self.command!='HEAD':self.wfile.write(payload)
ThreadingHTTPServer(('127.0.0.1',a.port),functools.partial(PagesPreview,directory=str(root))).serve_forever()
