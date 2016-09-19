angular.module('FitLyfe')
.controller('homeCtrl', ['$scope', 'RootFactory', 'AuthFactory', '$location', '$cookies', function($scope, RootFactory, AuthFactory, $location, $cookies){
  console.log(AuthFactory.getDecodedCredentials())
  console.log('null?', AuthFactory.getDecodedCredentials() !== null)
  console.log('empty string?', AuthFactory.getDecodedCredentials() !== '')
  // if(AuthFactory.getDecodedCredentials()){
  $scope.title = "Home Page"

  RootFactory.getApiRoot()
    .then(root => {
      console.log('home root call')
      $scope.root = root;
      // console.log('root', root);
    }
  )

  $scope.logout = () => {
    $cookies.remove('workoutCreds');
    $location.path('/');
  }
  // } else {
  //   $location.path('/');
  // }

}])
