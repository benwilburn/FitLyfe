
'use strict'
var app = angular.module('FitLyfe', ['ngRoute', 'ngCookies'])
app.constant("API_URL", "http://lyfe-fit:8000");
// app.constant("currentUserObject", currentUserObject);

// on page load, get cookie if it exists and set credentials/permissions.
app.run(AuthFactory => {
  AuthFactory.read();
});
