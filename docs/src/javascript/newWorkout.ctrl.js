// angular.module('FitLyfe')
app.controller('newWorkoutCtrl', [
  '$scope',
  '$location',
  '$http',
  'API_URL',
  '$cookies',
  'AuthFactory',
  'RootFactory',
  function($scope,
           $location,
           $http,
           API_URL,
           $cookies,
           AuthFactory,
           RootFactory){

  console.log('new workout control');
  $scope.registerTitle = 'register page';

  let currentUser = AuthFactory.getUserObject();

  $scope.newWorkout = () => {
    $http({
      url: `${API_URL}/workout_trackers/`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: {
        'name': $scope.workoutName,
        'athlete': currentUser.id
      }
    })
    .success(res => {
      console.log('res.success', res.success);
      if (res.success) {
        /*
        User was logged in, save credentials for use in requests
        to API that require permissions. Also, keeps page from logging you
        out on refresh
         */

        // create cookie and authorization headers for http requests etc.
        // AuthFactory.credentials({
        //   username: $scope.username,
        //   password: $scope.userpassword
        // });
        // Redirect to home page
        $location.path("FitLyfe/workouts/");
      }

    }).error(console.error);
  };
}])
