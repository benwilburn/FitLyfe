app.factory( "AuthFactory", ['$cookies', function($cookies) {

  let encodedCredentials = "";
  let decodedCredentials = {"username": "", "password": ""};



  return {
    encodeCredentials: (creds) => {
      decodedCredentials = creds;
      encodedCredentials = window.btoa(`${creds.username}:${creds.password}`);
    },
    getEncodedCredentials: () => {
      return encodedCredentials;
    },
    decodeCredentials: (encoded) => {
      encodedCredentials = encoded;
      const decoded = window.atob(encoded).split(":");
      decodedCredentials.username = decoded[0];
      decodedCredentials.password = decoded[1];
    },
    getDecodedCredentials: () => {
      return decodedCredentials.username;
    }
    // logout: () => {
    //   console.log('Logout');
    //
    // }

  };
}]);
