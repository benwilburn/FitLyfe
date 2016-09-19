'use strict'
var app = angular.module('FitLyfe', ['ngRoute', 'ngCookies'])
app.constant("API_URL", "http://localhost:8000");

// on page load, get cookie if it exists and set credentials/permissions.
app.run(AuthFactory => {
  AuthFactory.read();
});
