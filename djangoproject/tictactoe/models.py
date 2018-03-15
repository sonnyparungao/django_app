from django.db import models
from django.conf import settings

from datetime import datetime

#Create your models here.

class tictactoe(models.Model):
	result_id = models.AutoField(primary_key=True)
	winner = models.CharField(max_length=20)
	user_id = models.IntegerField()
	created_at = models.DateTimeField(default=datetime.now, blank=True)
	def __str__(self):
		return self.winner
	class Meta:
		verbose_name_plural = "Tictactoe Game Result"


class LoggedInUser(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='logged_in_user')