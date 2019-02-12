import io
import logging
import socketserver
from threading import Condition
from http import server

from os import listdir, remove
from os.path import isfile, join, exists
import shutil

mypath = "/home/pi/Desktop/output"

PAGE="""\
<html>
<head>
<title>dude MJPEG streaming</title>
</head>
<body>
<h1>dude MJPEG Streaming</h1>
</body>
</html>
"""

mypath = "output"

onlyfiles = sorted([int(f[:-5]) for f in listdir(mypath) if isfile(join(mypath, f))])

class StreamingHandler(server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.end_headers()
        elif self.path == '/index.html':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/list':
            global onlyfiles
            onlyfiles = sorted([int(f[:-5]) for f in listdir(mypath) if isfile(join(mypath, f))])
            list_vid = '<h2>The list of the downloadable H264 of the majestic Dude!<br/></h2><ul>'
            for i in onlyfiles: list_vid += '<li>'+'<a href="/download/'+str(i)+'">drone_'+str(i)+' video</a>'+' <a href="/delete/'+str(i)+'"><button style="cursor: pointer">Delete</button></a></li><br/>'
            list_vid += '</ul>'
            content = list_vid.encode('utf-8')

            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        else:
            for i in onlyfiles:
                if (self.path == join('/download',str(i))):
                    try :
                        self.send_response(200)
                        self.send_header('Content-Type','video/h264')
                        self.send_header('Content-Disposition', 'attachment;filename=drone_'+str(i)+'.h264;')
                        self.end_headers();
                        with open('output/'+str(i)+'.h264','rb') as f:
                            shutil.copyfileobj(f, self.wfile)
                        print('drone_'+str(i)+'.h264 copied')
                    except:
                        pass
                    return
                elif (self.path == join('/delete',str(i))):
                    try :
                        if(exists('output/'+str(i)+'.h264')):
                            remove('output/'+str(i)+'.h264')
                    except:
                        pass
                    print('output/'+str(i)+'.h264 deleted')
                    self.send_response(301)
                    self.send_header('Location', '/list')
                    self.end_headers()
                    return
            self.send_error(400)

class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True
try:
    address = ('', 8000)
    server = StreamingServer(address, StreamingHandler)
    server.serve_forever()
finally:
    pass
