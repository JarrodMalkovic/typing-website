from rest_framework.routers import SimpleRouter
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet, CurrentUserViewSet


routes = SimpleRouter()

routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'auth/current-user', CurrentUserViewSet, basename='auth-current-user')

urlpatterns = [
    *routes.urls
]

