from django.contrib import admin
from django.contrib.auth.models import User


class CustomUserAdmin(admin.ModelAdmin):
  list_display = ('username', 'is_active', 'is_staff')
  list_display_links = ('username',)

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
