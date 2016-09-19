'use strict'
var app = angular.module('FitLyfe', ['ngRoute', 'ngCookies'])
app.constant("API_URL", "http://localhost:8000");

// on page load, get cookie if it exists and set credentials/permissions.
app.run(function run(AuthFactory, $cookies, $http) {
  const workoutCookie= $cookies.get("workoutCreds");
  if (workoutCookie) {
    AuthFactory.decodeCredentials(workoutCookie);
    $http.defaults.headers.common.Authorization = "Basic " + AuthFactory.getEncodedCredentials();
  }
});
