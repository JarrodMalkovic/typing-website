from django.db.models import base
from core.questions.views import QuestionSubexerciseAPIView, QuestionIdAPIView, QuestionSubexerciseAttemptAPIView, QuestionExerciseAPIView, QuestionAPIView, QuestionSubexerciseOrderedAPIView
from rest_framework.routers import SimpleRouter
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet, CurrentUserViewSet
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
    path('practice/attempt/', QuestionSubexerciseAttemptAPIView.as_view()),
    path('questions/', QuestionAPIView.as_view()),
    path('questions/exercise/<slug:exercise>/',
         QuestionExerciseAPIView.as_view()),
    path('subexercises/exercise/<slug:exercise>/', QuestionSubexerciseOrderedAPIView.as_view()),
    * routes.urls,
]