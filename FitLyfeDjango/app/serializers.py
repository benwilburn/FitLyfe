from rest_framework import serializers
from rest_framework import permissions
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from app.models import *

# Class ExerciseLiftSerializer(serializers.HyperlinkedModelSerializer):
#     Class Meta:
#
class UserSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'url', 'username', 'first_name', 'last_name', 'bio', 'city', 'date_joined', 'groups', 'lifts_created', 'workouts_completed')

class GroupSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Group
        fields = ('id', 'url', 'name', 'permissions')

class PermissionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Permission
        fields = ('id', 'url', 'name', 'content_type', 'codename')

class ExerciseTypeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ExerciseType
        fields = ('id', 'url', 'name', 'set_range', 'rep_range_per_set', 'percentage_range', 'rest_time', 'exercise_limit', 'total_rep_range', 'associated_lifts')

class MuscleGroupSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = MuscleGroup
        fields = ('id', 'url', 'name', 'associated_muscles', 'associated_lifts')

class MusclesSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Muscle
        fields = ('id', 'url', 'name', 'muscle_location', 'muscle_group')

class ExerciseLiftSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ExerciseLift
        fields = ('id', 'url', 'name', 'description', 'video', 'creator', 'muscles_used', 'exercise_type')

class WorkoutTrackerSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = WorkoutTracker
        fields = ('id', 'url', 'name', 'date', 'athlete', 'exercises_completed')

class WorkoutTrackerExerciseSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = WorkoutTrackerExercise
        fields = ('id', 'url', 'lift', 'sets_completed', 'total_reps_completed', 'workout')
