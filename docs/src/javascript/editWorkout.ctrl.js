app.controller('editWorkoutCtrl', [
  '$scope', '$location', '$http', 'API_URL', '$cookies', 'AuthFactory', 'RootFactory', '$routeParams', '$timeout', function($scope,
                                                                                 $location,
                                                                                 $http,
                                                                                 API_URL,
                                                                                 $cookies,
                                                                                 AuthFactory,
                                                                                 RootFactory,
                                                                                 $routeParams,
                                                                                 $timeout){

      $scope.title = 'Edit Workouts';
      $scope.preselectedLifts = []

      RootFactory.getAllWorkouts()
        .then(workouts => {
          let allWorkouts = workouts;
          $scope.workoutTracker = workouts;
          for(var i = 0; i < allWorkouts.length; i++){
            if(allWorkouts[i].id == $routeParams.workoutId){
              $scope.workoutToEdit = allWorkouts[i];
            } else {
              console.log('no matches');
            }
          }
        })

      RootFactory.getExerciseLifts().then(lifts => {
        $scope.allLifts = lifts;
      })

      RootFactory.getAllWorkoutExercises().then(workoutExercises => {
        $scope.allWorkoutExercises = workoutExercises;
      })

      $scope.addToExercise = () => {
        for(var a = 0; a < $scope.workoutToEdit.exercises_completed.length; a++){
          let addLift = false;
          for(var b = 0; b < $scope.allWorkoutExercises.length; b++){
            if($scope.workoutToEdit.exercises_completed[a].name === $scope.allWorkoutExercises[b].lift.name && $scope.workoutToEdit.url === $scope.allWorkoutExercises[b].workout){
              console.log('this lift is already in the workout', $scope.workoutToEdit.exercises_completed[a].name);
            } else {
              console.log('lift needs to be added', $scope.workoutToEdit.exercises_completed[a]);
              addLift = true;
            }
          }
          if(addLift){
            $http({
              url: `${API_URL}/workout_tracker_exercises/`,
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              data: {
                lift: $scope.workoutToEdit.exercises_completed[a].id,
                workout: $scope.workoutToEdit.id
              }
            })
          } else {
            console.log("Don't you dare add that lift!");
          }
        }

        $http({
          url: `${API_URL}/workout_trackers/}`,
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          data: {
            id: $scope.workoutToEdit.id,
            name: $scope.workoutToEdit.name
          }
        })
        $location.path('/workouts');
      }


  }])
