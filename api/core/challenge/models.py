from core.user.models import User
from django.db import models
from django.conf import settings


class ChallengeAttempt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, related_name='challenge_attempt_user')
    wpm = models.FloatField()
    time_elapsed = models.FloatField()
    accuracy = models.FloatField()
    score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.attempt}"
