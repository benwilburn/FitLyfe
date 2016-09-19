angular.module('FitLyfe')
.controller('homeCtrl', ['$scope', 'RootFactory', 'AuthFactory', '$location', '$cookies', function($scope, RootFactory, AuthFactory, $location, $cookies){
  $scope.title = "Home Page";
  $scope.currentUsername = AuthFactory.getUsername();

  let currentUser = AuthFactory.getUserObject();
  console.log('currentUserObject', currentUser.user_type + ' is here!');

  $scope.logout = () => {
    AuthFactory.logout();
  }
}])
