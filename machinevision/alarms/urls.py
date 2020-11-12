from django.urls import path
from .api import AlarmAPIViewSet, AlarmAPIDetail

urlpatterns = [
    path('api/alarm/', AlarmAPIViewSet.as_view()),
    path('api/alarm/<int:pk>/', AlarmAPIDetail.as_view()),
]
