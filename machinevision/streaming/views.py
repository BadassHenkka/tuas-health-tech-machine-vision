from django.shortcuts import render
from django.http.response import StreamingHttpResponse
from streaming.stream import VideoCamera


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


# TODO: Improve this by making some kind of authentication required
# Make it POST view and require token...?
def video_feed(request):
    return StreamingHttpResponse(gen(VideoCamera()),
                                 content_type='multipart/x-mixed-replace; boundary=frame')
