from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Alarm
from .serializers import AlarmSerializer


class AlarmAPIViewSet(generics.ListCreateAPIView):
  permission_classes = [
      IsAuthenticated,
  ]
  serializer_class = AlarmSerializer
  queryset = Alarm.objects.all().order_by('-created_at')

  def list(self, request):
    queryset = self.get_queryset()

    qs_length = queryset.count()

    # For now we're only storing max 10 alarms to the database
    # Oldest alarm gets deleted
    if qs_length > 10:
      queryset.last().delete()

    serializer = AlarmSerializer(
      queryset,
      many=True
    )
    return Response(serializer.data)


class AlarmAPIDetail(generics.RetrieveUpdateAPIView):
  permission_classes = [
      IsAuthenticated,
  ]
  serializer_class = AlarmSerializer
  queryset = Alarm.objects.all()

  def update(request, *args, **kwargs):
    alarm = request.get_object()
    alarm.acknowledged = not alarm.acknowledged # save opposite of current value
    alarm.save()

    serializer = AlarmSerializer(alarm)

    return Response(serializer.data)
