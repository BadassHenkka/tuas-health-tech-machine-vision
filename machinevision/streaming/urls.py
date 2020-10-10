from django.urls import path, include
from streaming import views


urlpatterns = [
    path('video_feed', views.video_feed, name='video_feed'),
]
