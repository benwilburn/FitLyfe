app.controller('navCtrl', ['$scope', 'AuthFactory', '$location', '$timeout', '$route', function($scope, AuthFactory, $location, $timeout, $route){
  $scope.logout = () => {
    console.log('logout clicked');
    AuthFactory.logout();
    setTimeout(function(){
      $route.reload()
      console.log('reload function clicked');
      // $location.path('/');
    },
    3000
  )
  }
}])
