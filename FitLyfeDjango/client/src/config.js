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
    templateUrl: 'src/templates/login.html',
    controller: 'loginCtrl'
  })
  .when('/home/', {
    templateUrl: 'src/templates/home.html',
    controller: 'homeCtrl',
    resolve: { requiresAuth, currentUserObject }
  })
})
