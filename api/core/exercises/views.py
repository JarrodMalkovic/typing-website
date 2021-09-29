
from rest_framework.views import APIView
from .serializers import CreateExerciseSerializer, UpdateExerciseSerializer
from rest_framework.response import Response
from rest_framework import permissions, serializers, status, generics
from .models import Exercise
import cloudinary.uploader
from rest_framework.exceptions import APIException


class ExerciseAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        exercises = Exercise.objects.all()
        serializers = CreateExerciseSerializer(exercises, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def post(self, request):
        image_file = request.data.get('image_file')

        if not image_file:
            raise APIException(detail="You must provide an image")

        uploaded_image = cloudinary.uploader.upload(
            image_file, resource_type='raw')

        request.data['image'] = uploaded_image.get('secure_url')

        serializer = CreateExerciseSerializer(
            data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        for exercise_slug in request.data.get('exercises'):
            Exercise.objects.filter(exercise_slug=exercise_slug).delete()

        return Response(request.data.get('exercises'), status=status.HTTP_200_OK)


class UpdateExerciseAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, exercise_slug):
        exercise = Exercise.objects.get(exercise_slug=exercise_slug)
        serializer = UpdateExerciseSerializer(exercise, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
