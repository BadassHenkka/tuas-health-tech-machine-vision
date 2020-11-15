from django.urls import path
from .api import AlarmAPIViewSet, AlarmAPIDetail

urlpatterns = [
    path('api/alarm/list', AlarmAPIViewSet.as_view()),
    path('api/alarm/<int:pk>/detail', AlarmAPIDetail.as_view()),
]
