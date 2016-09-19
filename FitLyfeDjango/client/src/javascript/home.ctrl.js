angular.module('FitLyfe')
.controller('homeCtrl', ['$scope', 'RootFactory', 'AuthFactory', '$location', '$cookies', function($scope, RootFactory, AuthFactory, $location, $cookies){
  $scope.username = AuthFactory.getUsername();
  $scope.title = "Home Page";
  // $scope.user = username;

  RootFactory.getApiRoot()
    .then(root => {
      console.log('home root call')
      $scope.root = root;
    }
  )

  $scope.logout = () => {
    AuthFactory.logout();
  }

}])
