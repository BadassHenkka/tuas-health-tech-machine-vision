from django.contrib import admin

from .models import Alarm


class AlarmAdmin(admin.ModelAdmin):
  list_display = ('id', 'short_message', 'acknowledged', 'created_at', 'updated_at')
  list_display_links = ('id', 'short_message')


admin.site.register(Alarm, AlarmAdmin)
