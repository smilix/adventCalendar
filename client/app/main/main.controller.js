'use strict';

angular.module('adventApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.openAction = function (door) {
      console.log('door:', door);

      $location.path('/door/' + door);
    };

  });
