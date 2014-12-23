'use strict';

angular.module('adventApp').directive('htmlContent', function () {

  return {
    restrict: 'A',
    scope: {
      htmlContent: '='
    },
    link: function (scope, element, attr) {
      scope.$watch('htmlContent', function (newValue) {
        element.html(newValue);
      });
    }
  };

});

