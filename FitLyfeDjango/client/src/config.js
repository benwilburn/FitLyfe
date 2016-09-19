// angular.module('FitLyfe')
let requiresAuth = ($location, AuthFactory) => new Promise((resolve, reject) => {
  if (AuthFactory.getEncodedCredentials()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
    $location.path("/");
  }
});

app.config(($routeProvider, $httpProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'src/templates/login.html',
    controller: 'loginCtrl'
  })
  .when('/home/', {
    templateUrl: 'src/templates/home.html',
    controller: 'homeCtrl',
    resolve: { requiresAuth }
  })
})
