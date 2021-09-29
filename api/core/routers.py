from core.exercises.views import ExerciseAPIView, UpdateExerciseAPIView
from core.user.view import BanUserAPIView, DeleteAccountAPIView, DemoteUserAPIView, PromoteUserAPIView, UpdateUserProfileAPIView, UserProfileAPIView, UsersAPIView
from core.practice.views import PracticeAttemptAPIView
from core.questions.views import QuestionAttemptsAPIView, QuestionLeaderboardAPIView, QuestionStatsAPIView, QuestionSubexerciseAPIView, QuestionIdAPIView, QuestionExerciseAttemptAPIView, QuestionExerciseAPIView, QuestionAPIView, QuestionSubexerciseOrderedAPIView
from core.challenge.views import ChallengeAPIView, ChallengeAttemptsAPIView
from rest_framework.routers import SimpleRouter
from core.auth.viewsets import ChangePasswordAPIView, LoginViewSet, RegistrationViewSet, RefreshViewSet, CurrentUserViewSet
from django.urls import path


routes = SimpleRouter()

routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet,
                basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'auth/current-user', CurrentUserViewSet,
                basename='auth-current-user')

urlpatterns = [
    path('questions/subexercise/<slug:subexercise>/',
         QuestionSubexerciseAPIView.as_view()),
    path('questions/<int:id>/', QuestionIdAPIView.as_view()),
    path('questions/', QuestionAPIView.as_view()),
    path('questions/exercise/<slug:exercise>/',
         QuestionExerciseAPIView.as_view()),
    path('challenge/', ChallengeAPIView.as_view()),
    path('practice/exercise/<slug:exercise>/attempts/',
         QuestionExerciseAttemptAPIView.as_view()),
    path('challenge/attempts/', ChallengeAttemptsAPIView.as_view()),
    path('practice/attempt',
         PracticeAttemptAPIView.as_view()),
    path('subexercises/exercise/<slug:exercise>/',
         QuestionSubexerciseOrderedAPIView.as_view()),
    path('questions/leaderboard/', QuestionLeaderboardAPIView.as_view()),
    path('questions/stats/', QuestionStatsAPIView.as_view()),
    path('user/profile/', UpdateUserProfileAPIView.as_view()),
    path('auth/change-password/', ChangePasswordAPIView.as_view()),
    path('user/profile/<slug:username>/', UserProfileAPIView.as_view()),
    path('user/', DeleteAccountAPIView.as_view()),
    path('users/', UsersAPIView.as_view()),
    path('user/<int:id>/ban/', BanUserAPIView.as_view()),
    path('user/<int:id>/promote/', PromoteUserAPIView.as_view()),
    path('user/<int:id>/demote/', DemoteUserAPIView.as_view()),
    path('questions/attempts/', QuestionAttemptsAPIView.as_view()),

    path('exercises/', ExerciseAPIView.as_view()),
    path('exercises/<slug:exercise_slug>/', UpdateExerciseAPIView.as_view()),
    * routes.urls,
]
