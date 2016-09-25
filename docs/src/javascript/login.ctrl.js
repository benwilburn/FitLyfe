// angular.module('FitLyfe')
app.controller('loginCtrl', [
  '$scope',
  '$location',
  '$http',
  'API_URL',
  '$cookies',
  'AuthFactory',
  function($scope,
           $location,
           $http,
           API_URL,
           $cookies,
           AuthFactory){

  console.log('login control');
  $scope.loginTitle = 'login page';

  $scope.login = () => {
    $http({
      url: `${API_URL}/login_user/`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: {
        "username": $scope.userName,
        "password": $scope.userPassword,
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
        AuthFactory.credentials({
          username: $scope.userName,
          password: $scope.userPassword
        });
        // Redirect to home page
        $location.path("/home/");
      }

    }).error(console.error);
  };
}])
