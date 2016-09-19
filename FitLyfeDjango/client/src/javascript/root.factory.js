// angular.module('FitLyfe')
app.factory('RootFactory', ['$http', function($http){
  const apiRoot = $http.get('http://localhost:8000/')

  return {
    getApiRoot: () => {
      return apiRoot.then(res => res.data);
    },
  }
}])
