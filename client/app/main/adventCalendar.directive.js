'use strict';

angular.module('adventApp').directive('adventCalendar', function ($q, $window) {

  var DOOR_SIZE = {
    w: 170,
    h: 100
  };
  var PADDING = 15;

  function loadImage(url) {
    var deferred = $q.defer();

    var image = new Image();
    var jqImage = angular.element(image);

    jqImage.one('load', function () {
      var maxWidth = $window.innerWidth;
      var maxHeight = $window.innerHeight;
      var imgWidth = image.naturalWidth;
      var imgHeight = image.naturalHeight;

      console.log('max:', maxWidth, maxHeight);
      console.log('img', imgWidth, imgHeight);

      var width, height;
      if (maxWidth / imgWidth > maxHeight / imgHeight) {
        height = Math.min(maxHeight, imgHeight);
        width = height * imgWidth / imgHeight;
      } else {
        width = Math.min(maxWidth, imgWidth);
        height = width * imgHeight / imgWidth;
      }

      console.log('calc.', width, height);
      deferred.resolve({
        width: width,
        height: height
      });
    });
    image.src = url;


    return deferred.promise;
  }

  function createDoorArray(randomDistribution) {
    var result = [], i;
    for (i = 0; i < 24; i++) {
      result.push(i + 1);
    }

    if (!randomDistribution) {
      return result;
    }

    var seed = new Date().getDate() * 1000;
    function rnd(min, max) {
      var x = Math.sin(seed++) * 10000;
      var r =  x - Math.floor(x);
      return Math.floor(r * (max - min)) + min;
    }

    var a, b, tmp;
    for (i = 0; i < 100; i++) {
      a = rnd(0,24);
      b = rnd(0,24);
      tmp = result[a];
      result[a] = result[b];
      result[b] = tmp;
    }
    return result;
  }

  function createDoors(size, randomDistribution) {
    var doors = [];
    var doorWidth = DOOR_SIZE.w;
    var doorHeight = DOOR_SIZE.h;

    var leftOffset, topOffset;

    while (true) {
      leftOffset = (size.width - 5 * PADDING - 6 * doorWidth) / 2;
      if (leftOffset > 10) {
        break;
      }
      doorWidth -= 10;
    }

    while (true) {
      topOffset = (size.height - 3 * PADDING - 4 * doorHeight) / 2;
      if (topOffset > 10) {
        break;
      }
      doorHeight -= 10;
    }
    var doorDistribution = createDoorArray(randomDistribution);

    var number;
    for (var v = 0; v < 4; v++) {
      for (var h = 0; h < 6; h++) {
        number = (h + 1) + (v * 6);
        doors.push({
          number: doorDistribution[number - 1],
          style: {
            width: doorWidth + 'px',
            height: doorHeight + 'px',
            left: (h * doorWidth + h * PADDING + leftOffset) + 'px',
            top: (v * doorHeight + v * PADDING + topOffset) + 'px'
          }
        });
      }
    }

    return doors;
  }

  return {
    restrict: 'AE',
    templateUrl: 'app/main/adventCalendar.html',
    scope: {
      img: '@',
      callback: '&',
      random: '@'
    },
    link: function (scope, element) {
      scope.containerStyle = {};
      scope.doors = [];
      scope.openDoor = function (number) {
        scope.callback({
          '$number': number
        });
      };

      loadImage(scope.img).then(function (size) {

        scope.imageUrl = scope.img;
        scope.containerStyle = {
          'width': size.width + 'px',
          'height': size.height + 'px'
        };
        var randomDistribution = scope.random === 'true';
        scope.doors = createDoors(size, randomDistribution);
      });

    }
  };
});
