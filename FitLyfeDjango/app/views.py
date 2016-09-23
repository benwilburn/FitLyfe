from django.http import HttpResponse, HttpResponseRedirect, Http404
import json
from django.contrib.auth import logout, login, authenticate
from app.models import *
from django.views.decorators.csrf import csrf_exempt

# from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from app.serializers import *


######################### REST FRAMEWORK #######################
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse

class UsersView(viewsets.ModelViewSet):
    model = User
    queryset = model.objects.all()
    serializer_class = UserSerializer

# class GroupsView(viewsets.ModelViewSet):
#     model = Group
#     queryset = model.objects.all()
#     serializer_class = GroupSerializer
#
# class PermissionsView(viewsets.ModelViewSet):
#     model = Permission
#     queryset = model.objects.all()
#     serializer_class = PermissionSerializer

class ExerciseTypesView(viewsets.ModelViewSet):
    model = ExerciseType
    queryset = model.objects.all()
    serializer_class = ExerciseTypeSerializer

class MuscleGroupsView(viewsets.ModelViewSet):
    model = MuscleGroup
    queryset = model.objects.all()
    serializer_class = MuscleGroupSerializer

class MusclesView(viewsets.ModelViewSet):
    model = Muscle
    queryset = model.objects.all()
    serializer_class = MusclesSerializer

class ExerciseLiftsView(viewsets.ModelViewSet):
    model = ExerciseLift
    queryset = model.objects.all()
    serializer_class = ExerciseLiftSerializer

class WorkoutTrackersView(viewsets.ModelViewSet):
    model = WorkoutTracker
    queryset = model.objects.all()
    serializer_class = WorkoutTrackerSerializer


    def create(self, request):
        athlete = User.objects.get(id=request.data['athlete'])


        new_workout = WorkoutTracker.objects.create(
            name = request.data['name'],
            athlete = athlete
        )

        new_workout.save()

        success = True
        if new_workout is not None:
            pass
            # return HttpResponseRedirect('/')
        else:
            success = False

        data = json.dumps({'success': success})
        return HttpResponse(data, content_type='application/json')
        # return HttpResponse(status=201)

class WorkoutTrackerExercisesView(viewsets.ModelViewSet):
    model = WorkoutTrackerExercise
    queryset = model.objects.all()
    serializer_class = WorkoutTrackerExerciseSerializer

    def create(self, request):
        lift = ExerciseLift.objects.get(id=request.data['lift'])
        workout = WorkoutTracker.objects.get(id=request.data['workout'])

        workout_tracker_exercise = WorkoutTrackerExercise.objects.create(
            lift = lift,
            workout = workout,
            sets_completed = 0,
            total_reps_completed = 0
        )

        success = True;
        if workout_tracker_exercise is not None:
            workout_tracker_exercise.save()
        else:
            success = False;

        data = json.dumps({'success': success})
        return HttpResponse(data, content_type='application/json')
# @csrf_exempt
# def create_new_workout(request):
#     '''
#     Function to catch name of workout object they want to be created from new_workout.html.
#     Upon form submission, the values of the fields are passed in via the arg 'request'
#     and then set to variables below.
#
#     Following we create a new workout object by setting the variables passed in the the create_user function
#     below and then we save it to our database.
#
#     Args:
#         'request' - the values passed in as string via the $http call from newWorkoutCtrl of new_workout.html
#     '''
#
#     data = json.loads(request.body.decode())
#
#     name = data['name']
#     athlete = data['athlete']
#
#     workout = WorkoutTracker.objects.create(name=name, athlete=athlete)
#
#     success = True
#     if workout is not None:
#         pass
#     else:
#         success = False
#
#     data = json.dumps({'success': success})
#     return HttpResponse(data, content_type='application/json')


@csrf_exempt
def register_user(request):
    '''
        Function to catch registration of user from login.html.
        Upon form submission, the values of the fields are passed in via the arg 'request'
        and then set to variables below.

        Following we create a user by setting the variables passed in the the create_user function
        below and then we save it to our database.

        Args:
            'request' - the values passed in as string via the $http call from register.ctrl of register.html
    '''

    # data = imported json and using the .loads() function, passed in the
    # argument - the decoded body of the request to be posted which is
    # a dictionary of the info typed into the form. Data is the same as data
    # in the register-ctrl $http call.
    data = json.loads(request.body.decode())

    # ASSIGNS CORRESPONDING OBJ VALUE TO A VARIABLE
    username = data['username']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']
    bio = data['bio']
    city = data['city']
    user_type = data['usertype']

    # CALLS CREATE USER FUNCTION ON USER.OBJECTS
    user = User.objects.create_user(username=username,
                                    password=password,
                                    first_name=first_name,
                                    last_name=last_name,
                                    bio=bio,
                                    city=city,
                                    user_type=user_type)

    # SAVES USER DATA THAT WAS JUST POSTED
    user.save()

    currentUser = authenticate(username=username, password=password)

    success = True
    if currentUser is not None:
        login(request, currentUser)
        # return HttpResponseRedirect('/')
    else:
        success = False

    data = json.dumps({'success': success})
    return HttpResponse(data, content_type='application/json')

@csrf_exempt
def login_user(request):
    data = json.loads(request.body.decode())

    username = data['username']
    password = data['password']

    authenticated_user = authenticate(username=username, password=password)

    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
        # print('login user', request.user)
        # return user
    else:
        success = False

    data = json.dumps({'success': success})
    return HttpResponse(data, content_type='application/json')
