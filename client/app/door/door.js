'use strict';

angular.module('adventApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/door/:number', {
        templateUrl: 'app/door/door.html',
        controller: 'DoorCtrl'
      });
  });