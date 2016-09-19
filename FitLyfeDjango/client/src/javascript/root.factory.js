// angular.module('FitLyfe')
app.factory('RootFactory', ['$http', function($http){
  const apiRoot = $http.get('http://localhost:8000/')

  console.log('This is a Factory');


  return {
    getApiRoot: () => {
      console.log('this is the root');
      return apiRoot.then(res => res.data);
    },
    credentials (creds) {
      if (creds) {
        userCredentials = creds;
      } else {
        if (userCredentials.hasOwnProperty("password")) {
          return window.btoa(`${userCredentials.username}:${userCredentials.password}`);
        } else {
          return false;
        }
      }
    }
  }
}])
