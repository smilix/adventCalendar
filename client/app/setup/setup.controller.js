'use strict';

angular.module('adventApp').controller('SetupCtrl', function ($scope, $routeParams, $location, $window, $timeout, $sce, FileUploader, Day, ImageService) {

  function createUploader() {
    return new FileUploader({
      url: 'api/images/upload',
      autoUpload: true
    });
  }

  $scope.doors = [];

  $scope.number = parseInt($routeParams.number, 10);
  $scope.nextNumber = ($scope.number) % 24 + 1;
  $scope.prevNumber = ($scope.number - 2 + 24) % 24 + 1;

  $scope.data = {
    content: '',
    preview: '',
    justSaved: false
  };
  $scope.downloading = false;

  $scope.uploader = createUploader();
  $scope.su = {
    show: false,
    files: []
  };

  $scope.showUploads = function () {
    ImageService.getUploads().then(function (files) {
      $scope.su.files = files;
      $scope.su.show = true;
    });
  };

  $scope.insertImage = function (selectedFile) {
    var url = ImageService.getUrlForFile(selectedFile);
    $scope.data.content += '<img src="' + url + '" />';
  };


  $scope.goto = function (door) {
    $location.path('setup/' + door);
  };

  $scope.imageFromUrl = function () {
    var url = $window.prompt('Die Url zum Bild. (Dies wird heruntergeladen und ist dann auf diesem Server verfügbar.)');
    if (url) {
      $scope.downloading = true;
      ImageService.newImageByUrl(url).then(
        function ok() {
          $scope.downloading = false;
          $scope.showUploads();
        }, function error(msg) {
          $window.alert(msg);
          $scope.downloading = false;
        });
    }
  };

  $scope.insertImageDialog = function () {
    var url = $window.prompt('Die Url zum Bild');
    if (url) {
      $scope.data.content += '<img src="' + url + '" />';
    }
  };

  $scope.updatePreview = function () {
    $scope.data.preview = $scope.data.content;
  };

  $scope.save = function () {
    Day.setDay($scope.number, $scope.data.content).then(function () {
      $scope.updatePreview();

      var done = ($scope.data.content && $scope.data.content.length > 0);
      $scope.data.doorStatusList[$scope.number - 1].done = done;
      $scope.data.justSaved = true;
      $timeout(function () {
        $scope.data.justSaved = false;
      }, 3000);

    });
  };

  Day.getStatusList().then(function (doorStatusList) {
    $scope.data.doorStatusList = doorStatusList;

    if ($scope.number) {
      Day.getDay($scope.number).then(function (content) {
        $scope.data.content = content;
        $scope.data.preview = content;
      });
    }
  });

  $scope.uploader.onCompleteAll = function () {
    $scope.showUploads();
  };
});
