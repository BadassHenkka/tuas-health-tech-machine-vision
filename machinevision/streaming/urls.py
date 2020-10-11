from django.urls import include, path
from streaming import views

urlpatterns = [
    path('video_feed', views.video_feed, name='video_feed'),
]
