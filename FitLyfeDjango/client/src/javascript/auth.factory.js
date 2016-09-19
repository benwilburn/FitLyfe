// app.factory( "AuthFactory", ['$cookies', '$location', function($cookies, $location) {
//
//   let encodedCredentials = "";
//   let decodedCredentials = {"username": "", "password": ""};
//
//
//
//   return {
//     encodeCredentials: (creds) => {
//       decodedCredentials = creds;
//       encodedCredentials = window.btoa(`${creds.username}:${creds.password}`);
//     },
//     getEncodedCredentials: () => {
//       return encodedCredentials;
//     },
//     decodeCredentials: (encoded) => {
//       encodedCredentials = encoded;
//       const decoded = window.atob(encoded).split(":");
//       decodedCredentials.username = decoded[0];
//       decodedCredentials.password = decoded[1];
//     },
//     getDecodedCredentials: () => {
//       return decodedCredentials.username;
//     },
//     logout: () => {
//       console.log('Logout');
//       $cookies.remove('workoutCreds');
//       $location.path('/');
//     }
//
//   };
// }]);

app.factory('AuthFactory', [
  '$cookies', '$location',
  ($cookies, $location) => {
    let userCredentials = null;

    return {
      credentials (creds) {
        if (creds) {
          userCredentials = window.btoa(`${creds.username}:${creds.password}`);
          console.log('UserCredsINCredsSet', userCredentials)
          $cookies.put('workoutCreds', userCredentials);
        } else {
          console.log('UserCredsINCredsGet', userCredentials)
          return userCredentials;
        }
      },
      logout () {
        userCredentials = null;
        console.log('UserCredsINlogout', userCredentials)
        $cookies.remove('workoutCreds');
        $location.path("/");
      },
      read () {
        console.log('UserCredsINRead', userCredentials)
        return userCredentials = $cookies.get('workoutCreds');
      },
      update (creds) {
        userCredentials = creds;
        console.log('UserCredsINUpdate', userCredentials)
      },
      getUsername () {
        let creds = window.atob(userCredentials).split(":");
        console.log('UserCredsINgetUsername', creds)
        return creds[0]
      }
    }
  }
]);
