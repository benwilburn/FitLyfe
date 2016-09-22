// angular.module('FitLyfe')
app.factory('RootFactory', ['$http', function($http){
  const apiRoot = $http.get('http://localhost:8000/')


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
    }
  }
}])
