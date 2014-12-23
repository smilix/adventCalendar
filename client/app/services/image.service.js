'use strict';

angular.module('adventApp').service('ImageService', function ($http, $q) {

  return {

    getUploads: function () {
      return $http.get('api/images').then(function (response) {
        return response.data;
      });
    },

    getUrlForFile: function (uploadedFile) {
      return '/uploads/' + uploadedFile;
    },

    newImageByUrl: function (url) {
      var data = {
        url: url
      };
      return $http.post('api/images/fromUrl', data).then(
        function ok(response) {
          return response.data;
        }, function err(response) {
          return $q.reject('Fehler beim Download: ' + (response.data || 'no data'));
        });
    }
  };

});
