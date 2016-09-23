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
    fields = ('id', 'url', 'username', 'first_name', 'last_name', 'bio', 'city', 'date_joined', 'user_type', 'lifts_created', 'workouts_completed')


class MusclesSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Muscle
        fields = ('id', 'url', 'name', 'muscle_location', 'muscle_group')

class MuscleGroupSerializer(serializers.HyperlinkedModelSerializer):

    associated_muscles = MusclesSerializer(many=True, read_only=True)
    # associated_lifts = ExerciseLiftSerializer(many=True)

    class Meta:
        model = MuscleGroup
        fields = ('id', 'url', 'name', 'associated_muscles', 'associated_lifts')

class ExerciseLiftSerializer(serializers.HyperlinkedModelSerializer):

    muscles_used = MuscleGroupSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseLift
        fields = ('id', 'url', 'name', 'description', 'video', 'muscles_used', 'exercise_type', 'creator', 'exercise_priority')

class ExerciseTypeSerializer(serializers.HyperlinkedModelSerializer):

    associated_lifts = ExerciseLiftSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseType
        fields = ('id', 'url', 'name', 'set_range', 'rep_range_per_set', 'percentage_range', 'rest_time', 'exercise_limit', 'total_rep_range', 'type_priority' ,'associated_lifts')

class WorkoutTrackerExerciseSerializer(serializers.HyperlinkedModelSerializer):

    lift = ExerciseLiftSerializer(read_only=True)

    class Meta:
        model = WorkoutTrackerExercise
        fields = ('id', 'url', 'lift', 'sets_completed', 'total_reps_completed', 'workout')

class WorkoutTrackerSerializer(serializers.HyperlinkedModelSerializer):

    athlete = UserSerializer(read_only=True)
    exercises_completed = WorkoutTrackerExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = WorkoutTracker
        fields = ('id', 'url', 'name', 'date', 'athlete', 'exercises_completed')
