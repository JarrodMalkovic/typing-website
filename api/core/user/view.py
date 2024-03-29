from django.http.response import JsonResponse
from rest_framework.views import APIView
from .serializers import HeatmapSerializer, RecentAttemptsSerializer, UserSerializer, UpdateUserProfileSerializer, UserProfileSerializer, UsersSerializer
from rest_framework.response import Response
from rest_framework import serializers, status, generics
from .models import User
from rest_framework import permissions
from core.practice.models import PracticeAttempt
from django.db.models import Avg, Count
from datetime import timedelta
from django.utils import timezone
import math
from rest_framework.exceptions import APIException


class UserProfileAPIView(APIView):

    def get(self, _, username):
        user = User.objects.get(username=username)

        one_month_ago = timezone.now().date() - timedelta(days=30)
        stats = PracticeAttempt.objects \
            .filter(user=user.id,  created_at__gte=one_month_ago) \
            .aggregate(Avg('wpm'), Avg('score'), Avg('time_elapsed'))

        recent_attempts = PracticeAttempt.objects \
            .filter(user=user.id) \
            .select_related('subexercise_slug__exercise_slug') \
            .order_by('-created_at')[:10]

        one_year_ago = timezone.now().date() - timedelta(days=365)
        heatmap_data = PracticeAttempt.objects.extra(
            select={'date': "TO_CHAR(created_at, 'YYYY-MM-DD')"}) \
            .values('date') \
            .filter(user=user.id, created_at__gte=one_year_ago) \
            .order_by('date') \
            .annotate(count=Count('created_at'))

        data = {
            'recent_attempts': RecentAttemptsSerializer(recent_attempts, many=True).data,
            'user': UserProfileSerializer(user).data,
            'stats': stats,
            'heatmap_data': heatmap_data,
        }

        return Response(data, status=status.HTTP_200_OK)


class UsersAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        page = int(request.GET.get('page', 0))
        limit = min(int(request.GET.get('limit', 10)), 50)
        search = request.GET.get('search', '')
        skip = page * limit

        count = len(User.objects.filter(username__icontains=search))
        users = User.objects.filter(username__icontains=search)[
            skip:skip + limit]
        serializers = UsersSerializer(users, many=True)

        return Response({'pages': math.ceil(count / limit), 'users': serializers.data}, status=status.HTTP_200_OK)


class UpdateUserProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = UpdateUserProfileSerializer(user, request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteAccountAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = User.objects.filter(id=request.user.id)
        user.delete()

        return Response({}, status=status.HTTP_200_OK)


class BanUserAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, id):
        if(not request.user.is_staff or not request.user.is_superuser):
            raise APIException(
                detail='Only super admins and admins can ban users')

        user = User.objects.get(id=id)

        if(user.is_superuser):
            raise APIException(
                detail='You cannot ban a super admin')

        user.delete()

        return Response({}, status=status.HTTP_200_OK)


class PromoteUserAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, id):
        if(not request.user.is_superuser):
            raise APIException(detail='Only super admins can promote users')

        user = generics.get_object_or_404(User, pk=id)

        serializer = UsersSerializer(
            user,  data={'is_staff': True}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DemoteUserAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, id):
        if(not request.user.is_superuser):
            raise APIException(detail='Only super admins can demote users')

        user = generics.get_object_or_404(User, pk=id)
        serializer = UsersSerializer(
            user,  data={'is_staff': False}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
