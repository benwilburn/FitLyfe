app.factory('AuthFactory', [
  '$cookies', '$location', 'RootFactory', '$http',
  ($cookies, $location, RootFactory, $http) => {
    let userCredentials = null;
    let currentUserObject = null;

    return {
      credentials (creds) {
        if (creds) {
          userCredentials = window.btoa(`${creds.username}:${creds.password}`);
          $cookies.put('workoutCreds', userCredentials);
        } else {
          return userCredentials;
        }
      },
      logout () {
        userCredentials = null;
        $cookies.remove('workoutCreds');
        $location.path("/");
      },
      read () {
        return userCredentials = $cookies.get('workoutCreds');
      },
      update (creds) {
        userCredentials = creds;
      },
      getUsername () {
        // RETURNS CREDS.USERNAME
        let creds = window.atob(userCredentials).split(":");
        return creds[0]
      },
      setUserObject (user) {
        currentUserObject = user;
      },
      getUserObject(){
        return currentUserObject;
      }
    }
  }]);
