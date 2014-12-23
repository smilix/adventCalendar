'use strict';

angular.module('adventApp').directive('addRouteName', function ($timeout) {

  return {
    restrict: 'A',
    link: function (scope, element) {
      var lastRoute;
      scope.$on('$routeChangeStart', function (event, data) {
        if (lastRoute) {
          element.removeClass(lastRoute);
        }
        lastRoute = data.$$route.controller;
        element.addClass(lastRoute);
      });
    }
  };

});

