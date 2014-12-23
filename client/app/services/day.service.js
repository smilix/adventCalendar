'use strict';

angular.module('adventApp').service('Day', function ($http) {

  return {

    /**
     *
     * @returns {Promise} number
     */
    getCurrentDate: function () {
      return $http.get('api/days/now').then(function (response) {
        return new Date(response.data.now);
      });
    },

    getStatusList: function () {
      return $http.get('api/days/statusList').then(function (response) {
        return response.data;
      });
    },

    getDay: function (dayNumber) {
      return $http.get('api/days/' + dayNumber).then(function (response) {
        return response.data;
      });
    },

    setDay: function (dayNumber, content) {
      var data = {
        content: content
      };
      return $http.put('api/days/' + dayNumber, data);
    }

  };

});
