// angular.module('FitLyfe')
app.controller('registerCtrl', [
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
  $scope.registerTitle = 'register page';

  $scope.register = () => {
    $http({
      url: `${API_URL}/register_user/`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: {
        "username": $scope.username,
        "password": $scope.userpassword,
        'first_name': $scope.userfirstname,
        'last_name': $scope.userlastname,
        'bio': $scope.userbio,
        'city': $scope.usercity,
        'usertype': $scope.usertype
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
          username: $scope.username,
          password: $scope.userpassword
        });
        // Redirect to home page
        $location.path("/home/");
      }

    }).error(console.error);
  };
}])
