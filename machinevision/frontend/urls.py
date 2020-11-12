from django.urls import path
from django.conf.urls import url
from . import views

# If you need to work on the django rest framework APIs and you want to be able
# to see the API endpoints in the browser,
# then you can comment out url(r'^.*/$', views.index)

# This way you'll be able to test the DRF APIs in the browser
# (frontend routing won't work though, so remember to uncomment)

urlpatterns = [
    path('', views.index),
    # Regex matches, then lets routing be handled by the frontend. Still needs a / at end.
    url(r'^.*/$', views.index)
]
