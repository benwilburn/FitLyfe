from django.db import models
from django.contrib.auth.models import User
from django.core.validators import validate_comma_separated_integer_list
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group


# import settings from FitLyfeDjango
from django.conf import settings

type_of_users = [('Athlete', 'Athlete'), ('Trainer', 'Trainer')]


class User(AbstractUser):
    # user_type = models.CharField(choices=type_of_users)
    # ADD GROUPS TO SERIALIZER TO SELECT
    bio = models.TextField(max_length=600, blank=True)
    city = models.CharField(max_length=50, blank=True)
    date_joined = models.DateField(auto_now_add=True)
    user_type = models.CharField(choices=type_of_users, max_length=7)

    def __str__(self):
        return self.username

class ExerciseType(models.Model):
    name = models.CharField(max_length=50)
    set_range = models.CharField(max_length=3, validators=[validate_comma_separated_integer_list])
    rep_range_per_set = models.CharField(max_length=5, validators=[validate_comma_separated_integer_list])
    percentage_range = models.CharField(max_length=5, validators=[validate_comma_separated_integer_list])
    rest_time = models.DurationField()
    exercise_limit = models.IntegerField()
    total_rep_range = models.CharField(max_length=6, validators=[validate_comma_separated_integer_list])

    def __str__(self):
        return self.name

class MuscleGroup(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Muscle(models.Model):
    name = models.CharField(max_length=100)
    muscle_location = models.CharField(max_length=100)
    muscle_group = models.ForeignKey(MuscleGroup, related_name='associated_muscles')

    def __str__(self):
        return self.name

class ExerciseLift(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    # video = models.FileField(upload_to='exercise_videos/')
    video = models.FileField(upload_to='lifts/')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='lifts_created')
    muscles_used = models.ManyToManyField(MuscleGroup, related_name='associated_lifts')
    exercise_type = models.ManyToManyField(ExerciseType, related_name='associated_lifts')
    exercise_priority = models.IntegerField(default=0)

    def __str__(self):
        return self.name

# ASK RYAN IF YOU CAN GENERATE MULTIPLE FIELDS
class WorkoutTracker(models.Model):
    date = models.DateField(auto_now_add=True)
    name = models.CharField(max_length=50)
    athlete = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="workouts_completed")

    def __str__(self):
        return "{} {}".format(self.name, self.date)

###################### ANGULAR THOUGHT #####################

# POST FOR EACH EXERCISE ENTERED

############################################################

class WorkoutTrackerExercise(models.Model):
    lift = models.ForeignKey(ExerciseLift)
    sets_completed = models.IntegerField(blank=True)
    total_reps_completed = models.IntegerField(blank=True)
    workout = models.ForeignKey(WorkoutTracker, related_name="exercises_completed")

    def __str__(self):
        return self.lift.name
