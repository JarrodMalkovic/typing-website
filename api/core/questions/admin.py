from django.contrib import admin
from .models import Question, PracticeAttempt, ChallengeAttempt

admin.site.register(Question)
admin.site.register(PracticeAttempt)
admin.site.register(ChallengeAttempt)
