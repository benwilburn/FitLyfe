app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

// angular.module('FitLyfe')
app.config(($routeProvider) => {

  let requiresAuth = ($location, AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.credentials()) {
      console.log("User is authenticated, resolve route promise");
      resolve();
    } else {
      console.log("User is not authenticated, reject route promise");
      reject();
      $location.path("/");
    }
  });

  let currentUserObject = (AuthFactory, RootFactory, $http) => new Promise((resolve, reject) => {
    RootFactory.getApiRoot().then(res => {
      $http.get(res.users)
      .then(users => {
        allUsers = users.data
        currentUsername = AuthFactory.getUsername();
        for (var i = 0; i < allUsers.length; i++){
          if (currentUsername === allUsers[i].username) {
            resolve(allUsers[i]);
            AuthFactory.setUserObject(allUsers[i]);
          }
        }
        reject(null);
      })
    });
  })

  $routeProvider
  .when('/', {
    templateUrl: 'src/templates/home.html',
    controller: 'homeCtrl'
    // resolve: { currentUserObject }
  })
  .when('/login', {
    templateUrl: 'src/templates/login.html',
    controller: 'loginCtrl'
  })
  .when('/register', {
    templateUrl: 'src/templates/register.html',
    controller: 'registerCtrl'
  })
  .when('/workouts', {
    templateUrl: 'src/templates/workouts.html',
    controller: 'workoutsCtrl',
    resolve: { requiresAuth, currentUserObject }
  })
  .when('/new_workout', {
    templateUrl: 'src/templates/new_workout.html',
    controller: 'newWorkoutCtrl',
    resolve: { requiresAuth, currentUserObject }
  })
  .when('/workouts/:workoutId', {
    templateUrl: 'src/templates/edit_workout.html',
    controller: 'editWorkoutCtrl',
    resolve: { requiresAuth, currentUserObject }
  })
  .when('/in_development', {
    templateUrl: 'src/templates/in_development.html',
    controller: 'inDevelopmentCtrl',
  })
})
