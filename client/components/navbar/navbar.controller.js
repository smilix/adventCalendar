'use strict';

angular.module('adventApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Kalender',
      'link': '/'
    }, {
      'title': 'Setup',
      'link': '/setup'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });