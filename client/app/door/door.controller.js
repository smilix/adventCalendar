'use strict';

angular.module('adventApp').controller('DoorCtrl', function ($scope, $routeParams, Day) {

  var START_AT = new Date(2014, 11, 1);

  function makeMailLink(day) {
    var subject = 'Adventskalender am ' + day + '.';
    return 'mailto:HolgerCremer@gmail.com;Britta.Dreischer@gmail.com?subject=' + encodeURIComponent(subject);
  }

  $scope.ui = {
    loading: true,
    done: true,
    tooEarly: false,
    day: parseInt($routeParams.number, 10),
    content: ''
  };
  $scope.now = new Date();
  $scope.mail = makeMailLink($scope.ui.day);

  Day.getCurrentDate().then(function (currentDate) {
    if (currentDate < START_AT) {
      $scope.ui.tooEarly = true;
    } else if (currentDate.getDate() < $scope.ui.day) {
      $scope.ui.tooEarly = true;
    }
    if ($scope.ui.tooEarly) {
      $scope.ui.loading = false;
      return;
    }

    Day.getDay($scope.ui.day).then(function (data) {
      $scope.ui.done = data && data.length > 0;
      $scope.ui.content = data;
      $scope.ui.loading = false;
    });
  });

});
