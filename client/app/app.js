'use strict';

angular.module('adventApp', [
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'angularFileUpload'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });