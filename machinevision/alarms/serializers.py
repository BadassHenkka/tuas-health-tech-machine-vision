from rest_framework import serializers

from .models import Alarm


class AlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarm
        fields = (
          'id', 'message', 'acknowledged', 'created_at', 'updated_at'
        )
