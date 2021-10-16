from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import permissions
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from .serializers import QuestionSerializer, PracticeAttemptSerializer, GetQuestionsSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Question
from core.practice.models import PracticeAttempt
from core.subexercises.models import Subexercise
from core.exercises.models import Exercise
from core.challenge.models import ChallengeAttempt
from rest_framework.parsers import MultiPartParser, JSONParser
import cloudinary.uploader
from django.shortcuts import get_object_or_404
from core.challenge.serializers import ChallengeAttemptSerializer
from django.db.models import Avg, Count
from django.utils import timezone
from datetime import timedelta
import math


class QuestionSubexerciseAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, subexercise):
        try:
            current_subexercise = Subexercise.objects.get(
                subexercise_slug=subexercise, exercise_slug__hidden=False)

            level_request = current_subexercise.level
            current_exercise_slug = current_subexercise.exercise_slug

            if level_request == 1:
                questions = Question.objects.filter(
                    subexercise_slug=subexercise)
                serializers = QuestionSerializer(questions, many=True)
                return Response(serializers.data, status=status.HTTP_200_OK)

            previous_subexercise = Subexercise.objects.get(
                level=level_request-1, exercise_slug=current_exercise_slug)

            attempts = PracticeAttempt.objects.filter(
                subexercise_slug=previous_subexercise, user=request.user)

            if len(attempts) == 0:
                raise APIException(
                    detail="You must complete previous subexercises before this one", code=status.HTTP_400_BAD_REQUEST)

            questions = Question.objects.filter(
                subexercise_slug=subexercise)

            serializers = QuestionSerializer(questions, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)
        except Subexercise.DoesNotExist:
            raise APIException(
                detail="This subexercise does not exist", code=status.HTTP_400_BAD_REQUEST)


class QuestionSubexerciseOrderedAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, exercise):
        subexercises = Subexercise.objects.filter(
            exercise_slug=exercise).order_by('level')

        data = []
        for subexercise in subexercises:
            sub_data = {}
            sub_data["subexercise_slug"] = subexercise.subexercise_slug
            sub_data["subexercise_name"] = subexercise.subexercise_name
            sub_data["level"] = subexercise.level
            sub_data["description"] = subexercise.description
            sub_data["exercise_slug"] = subexercise.exercise_slug_id

            try:
                attempts = PracticeAttempt.objects.filter(
                    subexercise_slug=subexercise, user=request.user)

                sub_data["attempt"] = len(attempts) != 0
            except PracticeAttempt.DoesNotExist:
                sub_data["attempt"] = False
            data.append(sub_data)
        return Response(data, status=status.HTTP_200_OK)


class QuestionExerciseAPIView(APIView):
    def get(self, request, exercise):
        try:
            questions = Question.objects.filter(
                subexercise_slug_id__exercise_slug_id=exercise)

            serializers = GetQuestionsSerializer(questions, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


class QuestionIdAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get_object(self, id):
        return get_object_or_404(Question, id=id)

    def get(self, _, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        question = self.get_object(id)
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, JSONParser)

    def delete(self, request):
        for id in request.data.get('questions'):
            Question.objects.filter(id=id).delete()

        return Response(request.data.get('questions'), status=status.HTTP_200_OK)

    def post(self, request):
        serializer = None
        audio_file = request.data.get('audio_file')

        if audio_file:
            upload_data = cloudinary.uploader.upload(
                audio_file, resource_type='raw')

            data = {
                'audio_url': upload_data.get('secure_url'),
                'question': request.data.get('question'),
                'subexercise_slug': request.data.get('subexercise_slug'),
                'translation': request.data.get('translation')
            }

            serializer = QuestionSerializer(data=data)
        else:
            serializer = QuestionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionExerciseAttemptAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, exercise):
        page = int(request.GET.get('page', 0))
        limit = min(int(request.GET.get('limit', 10)), 50)
        skip = page * limit

        attempts = PracticeAttempt.objects.filter(
            subexercise_slug_id__exercise_slug_id=exercise, user=request.user)

        serializers = PracticeAttemptSerializer(
            attempts[skip:skip + limit], many=True)

        return Response({'pages': math.ceil(len(attempts) / limit), 'attempts': serializers.data}, status=status.HTTP_200_OK)


class QuestionLeaderboardAPIView(APIView):

    def get(self, request):
        print('test')
        category = request.GET.get('category', 'all')

        top_attempts = None
        serializers = None

        if category == 'all':
            top_attempts = PracticeAttempt.objects.select_related(
                'user').order_by("-score")[:10]
            serializers = PracticeAttemptSerializer(top_attempts, many=True)
        elif category == 'challenge':
            top_attempts = ChallengeAttempt.objects.select_related(
                'user').order_by("-score")[:10]
            serializers = ChallengeAttemptSerializer(top_attempts, many=True)
        else:
            top_attempts = PracticeAttempt.objects.filter(
                subexercise_slug_id__exercise_slug_id=category).select_related(
                'user').order_by("-score")[:10]
            serializers = PracticeAttemptSerializer(top_attempts, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)


class QuestionStatsAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        category = request.GET.get('category', 'all')

        recent_stats = None
        charts = None

        one_month_ago = timezone.now().date() - timedelta(days=30)

        if category == 'all':
            recent_stats = PracticeAttempt.objects \
                .filter(created_at__gte=one_month_ago) \
                .aggregate(Avg('wpm'), Avg('accuracy'), Avg('time_elapsed'))

            charts = PracticeAttempt.objects.extra(
                select={'date': "TO_CHAR(practice_practiceattempt.created_at, 'YYYY-MM-DD')"}) \
                .values('date') \
                .order_by('date') \
                .annotate(wpm=Avg('wpm'), time_elapsed=Avg('time_elapsed'), accuracy=Avg('accuracy'))
        elif category == 'challenge':
            recent_stats = ChallengeAttempt.objects \
                .filter(created_at__gte=one_month_ago) \
                .aggregate(Avg('wpm'), Avg('accuracy'), Avg('time_elapsed'))

            charts = ChallengeAttempt.objects.extra(
                select={'date': "TO_CHAR(challenge_challengeattempt.created_at, 'YYYY-MM-DD')"}) \
                .values('date') \
                .order_by('date') \
                .annotate(wpm=Avg('wpm'), time_elapsed=Avg('time_elapsed'), accuracy=Avg('accuracy'))
        else:
            recent_stats = PracticeAttempt.objects \
                .filter(created_at__gte=one_month_ago, subexercise_slug__exercise_slug=category) \
                .aggregate(Avg('wpm'), Avg('accuracy'), Avg('time_elapsed'))

            charts = PracticeAttempt.objects.extra(
                select={'date': "TO_CHAR(practice_practiceattempt.created_at, 'YYYY-MM-DD')"}) \
                .values('date') \
                .filter(subexercise_slug__exercise_slug=category) \
                .order_by('date') \
                .annotate(wpm=Avg('wpm'), time_elapsed=Avg('time_elapsed'), accuracy=Avg('accuracy'))

        data = {
            'recent_stats': recent_stats,
            'charts': charts
        }

        return Response(data, status=status.HTTP_200_OK)


class QuestionAttemptsAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        category = request.GET.get('category', 'all')
        page = int(request.GET.get('page', 0))
        limit = min(int(request.GET.get('limit', 10)), 50)
        skip = page * limit

        serializers = None
        count = None

        if category == 'all':
            count = len(PracticeAttempt.objects.all())
            attempts = PracticeAttempt.objects.select_related(
                'user')[skip:skip + limit]
            serializers = PracticeAttemptSerializer(attempts, many=True)
        elif category == 'challenge':
            count = len(ChallengeAttempt.objects.all())
            attempts = ChallengeAttempt.objects.select_related(
                'user')[skip:skip + limit]
            serializers = ChallengeAttemptSerializer(attempts, many=True)
        else:
            count = len(PracticeAttempt.objects.filter(
                subexercise_slug_id__exercise_slug_id=category))
            attempts = PracticeAttempt.objects.filter(
                subexercise_slug_id__exercise_slug_id=category).select_related(
                'user')[skip:skip + limit]
            serializers = PracticeAttemptSerializer(attempts, many=True)

        return Response({'pages': math.ceil(count / limit), 'attempts': serializers.data}, status=status.HTTP_200_OK)


class QuestionExcelDownload(APIView):
    permission_classes = [permissions.IsAdminUser]

    # For a given exercise, return in a list of dictionaries
    # containing every question along with its subexercise and meaning
    # If a question does not have a meaning, N/A is supplied
    def get(self, request, exercise_slug):
        question_list = []
        subexercises = Subexercise.objects.filter(
            exercise_slug=exercise_slug)

        for subexercise in subexercises:
            questions = Question.objects.filter(
                subexercise_slug=subexercise.subexercise_slug)

            for question in questions:
                data = {
                    'subexercise': subexercise.subexercise_name,
                    'question': question.question,
                    'translation':  question.translation
                }

                question_list.append(data)
        return Response(question_list, status=status.HTTP_200_OK)


class QuestionExcelUpload(APIView):
    permission_classes = [permissions.IsAdminUser]
    # Upload the excel doc and update the database with
    # Two ways:
    # 1. upload the excel and make the database represent the excel (replace)
    # 2. uplaod the excel and append the questions to database (add)

    def remove_empty_questions(self, data):
        new_data = data
        try:
            for exercise in new_data:
                for question in exercise[1]:
                    if question['subexercise'] == '' or question['subexercise'] == "":
                        exercise[1].remove(question)
        except:
            raise APIException(
                detail='Specify all subexercises - some are blank. No questions added.')
        return new_data

    # Checks if there any duplicate questions provided in the excel document
    def check_duplicates(self, data):
        new_data = []
        for exercise in data:
            new_data.append([exercise[0], []])

        for i in range(len(data)):
            for j in range(len(data[i][1])):
                try:
                    question = data[i][1][j]['question']
                    translation = data[i][1][j]['translation']
                    found = 0
                    for k in range(len(new_data)):
                        for l in range(len(new_data[i][1])):
                            if(len(new_data[k][1]) != 0):
                                if question == new_data[k][1][l]['question'] and translation == new_data[k][1][l]['translation']:
                                    found = 1
                    if found == 0:
                        new_data[i][1].append(data[i][1][j])
                except:
                    raise APIException(
                        detail='Specify all questions and translations - some are blank. No questions added.')
        return new_data

    '''
    Takes a list of lists
    Each list containes two items. The first item is a dictionary
    that specifies the exercise that the questions are for.
    The second item is a list of dictionaries - each dictionary is a new question
    This function will save the questions (add to existing database)
    Example inner list:
    [{"exercise": "letters"},
    [{"subexercise":"C + V", "question":"hello", "meaning":"hello-meaning"},
    {"subexercise":"Shift C + V", "question":"new", "meaning":"new-meaning"}]],
    '''

    def post(self, request):
        filled_data = self.remove_empty_questions(request.data['data'])
        filtered_data = self.check_duplicates(filled_data)

        all_questions = []
        for exercise in filtered_data:
            for question in exercise[1]:
                try:
                    subexercise_name = question['subexercise']
                    subexercise = Subexercise.objects.get(
                        subexercise_name=subexercise_name)
                except Subexercise.DoesNotExist:
                    raise APIException(detail='Subexercise "{}" does not exist'.format(
                        subexercise_name))

                try:
                    # Prevents adding a question that exists in database already
                    question_exist = Question.objects.get(
                        question=question['question'], translation=question['translation'])
                    continue
                except:
                    if question['question'] == '':
                        # print("ENTER")
                        raise APIException(
                            detail='Specify all questions - some are blank. No questions added.')
                    elif question['translation'] == '':
                        raise APIException(
                            detail='Specify all translations - some are blank. No questions added.')
                    elif subexercise.subexercise_slug == '':
                        raise APIException(
                            detail='Specify all subexercises - some are blank. No questions added.')

                    new_question = {
                        "subexercise_slug": subexercise.subexercise_slug,
                        "question": question['question'],
                        "translation": question['translation']
                    }
                    all_questions.append(new_question)

        serializer = QuestionSerializer(data=all_questions, many=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
