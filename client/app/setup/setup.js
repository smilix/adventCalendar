'use strict';

angular.module('adventApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/setup/:number?', {
        templateUrl: 'app/setup/setup.html',
        controller: 'SetupCtrl'
      });
  });