from django.db import models
from django.template.defaultfilters import truncatechars


class Alarm(models.Model):
  message = models.CharField(max_length=150)
  acknowledged = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  @property
  def short_message(self):
    return truncatechars(self.message, 20)
