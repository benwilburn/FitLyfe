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

class WorkoutTrackerExercisesView(viewsets.ModelViewSet):
    model = WorkoutTrackerExercise
    queryset = model.objects.all()
    serializer_class = WorkoutTrackerExerciseSerializer


@csrf_exempt
def register_user(request):
    '''
        Function to catch registration of user from login.html.
        Upon form submission, the values of the fields are passed in via the arg 'request'
        and then set to variables below.

        Following we create a user by setting the variables passed in the the create_user function
        below and then we save it to our database.

        Args:
            'request' - the values passed in as string via the $http call from register-ctrl of login.html
    '''

    # data = imported json and using the .loads() function, passed in the
    # argument - the decoded body of the request to be posted which is
    # a dictionary of the info typed into the form. Data is the same as data
    # in the register-ctrl $http call.
    data = json.loads(request.body.decode())

    # ASSIGNS CORRESPONDING OBJ VALUE TO A VARIABLE
    username =  data['username']
    password = data['password']
    email = data['email']
    first_name = data['first_name']
    last_name = data['last_name']

    # CALLS CREATE USER FUNCTION ON USER.OBJECTS
    user = User.objects.create_user(
                                    username=username,
                                    password=password,
                                    email=email,
                                    first_name=first_name,
                                    last_name=last_name,
                                    )

    # SAVES USER DATA THAT WAS JUST POSTED
    user.save()

    currentUser = authenticate(username=username, password=password)

    if currentUser is not None:
        login(request, currentUser)
        return HttpResponseRedirect('/')
    else:
        return Http404

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
