
from rest_framework.views import APIView
from .serializers import CreateExerciseSerializer, UpdateExerciseSerializer
from rest_framework.response import Response
from rest_framework import permissions, serializers, status, generics
from .models import Exercise
import cloudinary.uploader
from rest_framework.exceptions import APIException
from myapi.permissions import IsAdminUserOrReadOnlyAndIsAuthenticated
from django.db.models import F
from bulk_update.helper import bulk_update


class ExerciseAPIView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        if request.user.is_staff or request.user.is_superuser:
            exercises = Exercise.objects.all().order_by('level')
            serializers = CreateExerciseSerializer(exercises, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)

        exercises = Exercise.objects.filter(hidden=False).order_by('level')
        serializers = CreateExerciseSerializer(exercises, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request):
        image_file = request.data.get('image_file')

        if not image_file:
            raise APIException(detail="You must provide an image")

        uploaded_image = cloudinary.uploader.upload(
            image_file, resource_type='raw')

        exercises = Exercise.objects.all()

        request.data['image'] = uploaded_image.get('secure_url')
        request.data.update({"level": len(exercises) + 1})

        serializer = CreateExerciseSerializer(
            data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        for exercise_slug in request.data.get('exercises'):
            Exercise.objects.filter(exercise_slug=exercise_slug).delete()

        return Response(request.data.get('exercises'), status=status.HTTP_200_OK)

    def patch(self, request):
        exercises = Exercise.objects.all()

        for exercise in exercises:
            exercise.level = request.data.get(
                exercise.exercise_slug).get('level')

        bulk_update(exercises)
        serializers = CreateExerciseSerializer(exercises, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)


class UpdateExerciseAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, exercise_slug):
        exercise = Exercise.objects.get(exercise_slug=exercise_slug)
        serializer = UpdateExerciseSerializer(exercise, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, exercise_slug):
        deleted_exercise = Exercise.objects.get(
            exercise_slug=exercise_slug)

        serializer = CreateExerciseSerializer(deleted_exercise)
        deleted_exercise.delete()

        Exercise.objects.filter(level__gt=deleted_exercise.level) \
            .update(level=F('level') - 1)

        return Response(serializer.data, status=status.HTTP_200_OK)
