from rest_framework.views import APIView
from .serializers import QuestionSerializer, PracticeAttemptSerializer, GetQuestionsSerializer, SubexerciseSerializer, ChallengeAttemptSerializer
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Question, PracticeAttempt, ChallengeAttempt
from core.subexercises.models import Subexercise
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, JSONParser
import cloudinary.uploader
from django.shortcuts import get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin


# /api/questions/subexercise/<slug:subexercise>/
# AUTHENTICATED USER ONLY
class QuestionSubexerciseAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # GET - Returns all questions for a given subexercise given
    # it is level 1, or they have completed previous subexercise
    def get(self, request, subexercise):
        # Get the level of subexercise requested
        current_subexercise = Subexercise.objects.get(
            subexercise_slug=subexercise)
        level_request = current_subexercise.level
        current_exercise_slug = current_subexercise.exercise_slug

        # If user requesting level 1, return all questions
        # Otherwise, check if there exists an attempt for the previous subexercise
        if level_request == 1:
            questions = Question.objects.filter(subexercise_slug=subexercise)
            serializers = QuestionSerializer(questions, many=True)
            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            previous_subexercise = Subexercise.objects.get(
                level=level_request-1, exercise_slug=current_exercise_slug)
            
            try:
                attempt = PracticeAttempt.objects.get(subexercise_slug=previous_subexercise, user=request.user)
                questions = Question.objects.filter(subexercise_slug=subexercise)
                serializers = QuestionSerializer(questions, many=True)
                return Response(serializers.data, status=status.HTTP_200_OK)
            except PracticeAttempt.DoesNotExist:
                context = {"attempted": False}
                return Response(context, status=status.HTTP_200_OK)
  
  
# /api/subexercises/exercise/<slug:exercise>/ 
# AUTHENTICAED USER ONLY
class QuestionSubexerciseOrderedAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # GET - Return all the subexercises, in order by level.
    # If they have not completed the previous subexercise, it's
    # attempted field is set to False.
    def get(self, request, exercise):
        subexercises = Subexercise.objects.filter(exercise_slug=exercise).order_by('level')
        
        data = []
        for subexercise in subexercises:
            sub_data = {}
            sub_data["subexercise_slug"] = subexercise.subexercise_slug
            sub_data["subexercise_name"] = subexercise.subexercise_name
            sub_data["level"] = subexercise.level
            
            try:
                attempt = PracticeAttempt.objects.get(subexercise_slug=subexercise, user=request.user)
                sub_data["attempt"] = True
            except PracticeAttempt.DoesNotExist:
                sub_data["attempt"] = False
            data.append(sub_data)
        return Response(data, status=status.HTTP_200_OK)


# /api/questions/exercise/<slug:exercise>/
class QuestionExerciseAPIView(APIView):
    # GET - Returns all questions for a given exercise - Admin Only
    # TODO: Make it so only admins can access this route
    def get(self, request, exercise):
        try:
            questions = Question.objects.filter(
                subexercise_slug_id__exercise_slug_id=exercise)

            serializers = GetQuestionsSerializer(questions, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


# /api/questions/<int:id>/
# ADMIN ONLY
class QuestionIdAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, id):
        # If question id does not exist, returns 404 NOT FOUND
        return get_object_or_404(Question, id=id)

    # GET - Gets the specific question by its id
    def get(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    # DELETE - Deletes a question by ID - Admin Only
    def delete(self, request, id):
        return Response()

    # PUT - Edits a question by ID - Admin Only
    def put(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /api/questions/
# ADMIN ONLY
class QuestionAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, JSONParser)

    # DELETE - Deletes many questions (Body will contain an array of the ID's to delete)
    def delete(self, request):
        for id in request.data.get('questions'):
            Question.objects.filter(id=id).delete()

        return Response(request.data.get('questions'), status=status.HTTP_200_OK)

    # POST - Creates a question - Admin Only
    # TODO: Make it so only admins can access this route
    def post(self, request):
        serializer = None
        audio_file = request.data.get('audio_file')

        if audio_file:
            upload_data = cloudinary.uploader.upload(
                audio_file, resource_type='raw')

            print(request.data)

            data = {
                'audio_url': upload_data.get('secure_url'),
                'question': request.data.get('question'),
                'subexercise_slug': request.data.get('subexercise_slug')
            }

            serializer = QuestionSerializer(data=data)
        else:
            serializer = QuestionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/questions/subexercise/attempt
# OR /api/practice/attempt
class QuestionSubexerciseAttemptAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    # POST - Saves a users attempt for a given subexercisie - Auth Required
    def post(self, request):
        serializer = PracticeAttemptSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# OR /api/practice/subexercise/<slug:subexercise>/attempts
class QuestionSubexerciseAttemptsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    # GET - Returns a users attempts for a given subexercise - Auth Required
    def get(self, request, subexercise):
        try:
            attempts = PracticeAttempt.objects.filter(subexercise_slug=subexercise, user=request.user)
            serializers = PracticeAttemptSerializer(attempts, many=True)
            
            # If no attempts for this subexercise, return false
            if serializers.data == []:
                data = {
                    "attempted": False
                }
                return Response(data, status=status.HTTP_200_OK)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except PracticeAttempt.DoesNotExist:
            return Response([], status=status.HTTP_404_NOT_FOUND)


# /api/practice/exercise/<slug:exercise>/attempts
class QuestionExerciseAttemptAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    # GET - Returns a users attempts for a given exercise - Auth Required
    def get(self, request, exercise):
        try:
            # Find all the subexercises in an exercise
            subexercises = Subexercise.objects.filter(exercise_slug=exercise)
            attempts_id = []
            for subexercise in subexercises:
                attempts = PracticeAttempt.objects.filter(subexercise_slug=subexercise, user=request.user)
                
                # Find the id of all attempts made by a user for each subexercise
                for attempt in attempts:
                    attempts_id.append(attempt.pk)
            
            # Use the id list to query PracticeAttempt table
            all_attempts = PracticeAttempt.objects.filter(pk__in=attempts_id)            
            serializers = PracticeAttemptSerializer(all_attempts, many=True)
            
            # If no attempts for this exercise, return false
            if serializers.data == []:
                data = {
                    "attempted": False
                }
                return Response(data, status=status.HTTP_200_OK)
            return Response(serializers.data, status=status.HTTP_200_OK)
        except PracticeAttempt.DoesNotExist:
            return Response([], status=status.HTTP_404_NOT_FOUND)

# /api/leaderboard/<factor>/<int:number>/
class ChallengeLeaderboardAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    # GET - Returns the top 'number' users for the challenge mode
    # @parameter factor: Filters the results by either score, wpm or accuracy
    #                    from highest to lowest
    # @parameter number: Limits the number of results to number
    #                    e.g. Display top 5, top 10, top 50 etc.
    def get(self, request, factor, number):
        if factor in ['score', 'wpm', 'accuracy'] and number >= 1:
            ordering = "-" + factor
            challenge_attempts = ChallengeAttempt.objects.order_by(ordering)[:number:1]
            
            data = []
            for attempt in challenge_attempts:
                sub_data = {}
                sub_data["username"] = attempt.user.username
                sub_data["score"] = attempt.score
                sub_data["wpm"] = attempt.wpm
                sub_data["accuracy"] = attempt.accuracy
                data.append(sub_data)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_400_BAD_REQUEST)