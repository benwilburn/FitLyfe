// angular.module('FitLyfe')
app.factory('RootFactory',
  ['$http',
  'AddressFactory',
  function($http, 
           AddressFactory){
  let address = AddressFactory.getApiRootAddress();
  console.log('address', address);
  const apiRoot = $http.get(address)

  return {
    getApiRoot: () => {
      return apiRoot.then(res => res.data);
    },
    getExerciseTypes: () => {
      let exercise_types = apiRoot.then(res => {
        return $http.get(res.data.exercise_types).then(types => {
          return types.data;
        });
      })
      return exercise_types;
    },
    getExerciseLifts: () => {
      let exercise_lifts = apiRoot.then(res => {
        return $http.get(res.data.exercise_lifts).then(lifts => {
          return lifts.data;
        })
      })
      return exercise_lifts
    },
    getAllWorkouts: () => {
      let user_workouts = apiRoot.then(res => {
        return $http.get(res.data.workout_trackers).then(workouts => {
          console.log('workouts from factory', workouts)
          return workouts.data;
        })
      })
      return user_workouts;
    },
    getAllWorkoutExercises: () => {
      let workoutExercises = apiRoot.then(res => {
        return $http.get(res.data.workout_tracker_exercises).then(workoutExercisesData => {
          return workoutExercisesData.data;
        })
      })
      return workoutExercises;
    }
  }
}])
