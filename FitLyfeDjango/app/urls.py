from django.conf.urls import url

from app import views

from rest_framework import routers
from django.conf.urls import url, include
from app import views

router = routers.DefaultRouter()
router.register(r'users', views.UsersView)
# router.register(r'groups', views.GroupsView)
# router.register(r'permissions', views.PermissionsView)
router.register(r'exercise_types', views.ExerciseTypesView)
router.register(r'muscle_groups', views.MuscleGroupsView)
router.register(r'muscles', views.MusclesView)
router.register(r'exercise_lifts', views.ExerciseLiftsView)
router.register(r'workout_trackers', views.WorkoutTrackersView)
router.register(r'workout_tracker_exercises', views.WorkoutTrackerExercisesView)
# router.register(r'login_user', views.login_user)
# router.register(r'register_user', views.register_user)
# router.register(r'api-auth', include('rest_framework.urls', namespace='rest_framework'))

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^login_user/$', views.login_user),
    url(r'^register_user/$', views.register_user),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
