app.controller('navCtrl', ['$scope', 'AuthFactory', function($scope, AuthFactory){
  $scope.logout = () => {
    AuthFactory.logout();
  }
}])
