from datetime import datetime, timezone

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import (HttpResponseBadRequest,
                                  HttpResponseForbidden, StreamingHttpResponse)
from django.views.decorators.http import require_http_methods
from streaming.stream import VideoCamera


def gen(camera):
  while True:
    frame = camera.get_frame()
    yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@require_http_methods(["GET"])
def video_feed(request):
  # Get username from request query parameters
  username = request.GET.get('user')
  if not username:
      return HttpResponseBadRequest()

  # Only accept requests from valid existing users
  try:
      user = User.objects.get(username=username)
  except ObjectDoesNotExist:
      return HttpResponseBadRequest()

  # Check that the user has a token - ie. they are logged in
  # User should only have one token at a time
  token = user.auth_token_set.first()
  if not token:
      return HttpResponseBadRequest()

  # Make sure the token hasn't expired
  now = datetime.now(timezone.utc)
  if token.expiry < now:
      return HttpResponseForbidden()

  # If the user is valid and has a token, return the stream
  stream = StreamingHttpResponse(gen(VideoCamera()),
                                  content_type='multipart/x-mixed-replace; boundary=frame')

  return stream
