from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, viewsets, mixins
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from core.auth.serializers import LoginSerializer, RegisterSerializer
from core.user.serializers import UserSerializer
from rest_framework.views import APIView
from core.user.models import User


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    """ Adapted from: https://dev.to/koladev/django-rest-authentication-cmh """

    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    """ Adapted from: https://dev.to/koladev/django-rest-authentication-cmh """

    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        res = {
            "user": {
                'email': user.email,
                'username': user.username,
                'avatar': user.avatar,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response(res, status=status.HTTP_201_CREATED)


class RefreshViewSet(ViewSet, TokenRefreshView):
    """ Adapted from: https://dev.to/koladev/django-rest-authentication-cmh """

    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CurrentUserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    def list(self, request, format=None):
        res = {
            'username': request.user.username,
            'email': request.user.email,
            'avatar': request.user.avatar,
            'isAdmin': request.user.is_staff
        }

        return Response(res, status=status.HTTP_200_OK)


class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = User.objects.get(id=request.user.id)

        new_password = request.data.get('password', '')
        user.set_password(new_password)
        user.save()

        return Response(status=status.HTTP_200_OK)
