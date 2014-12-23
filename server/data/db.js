// https://www.npmjs.org/package/flat-file-db
var flatfile = require('flat-file-db');
var config = require('../config/environment');

var flatFileDb = flatfile.sync(config.flatDb.file);


var db = {
  getDayStatusList: function () {
    var days = [];
    var day, item;
    for (day = 1; day <= 24; day++) {
      item = db.getDay(day);
      days.push({
        day: day,
        done: !!(item && item.length > 0)
      });
    }
    return days;
  },

  getDay: function (dayNumber) {
    return flatFileDb.get('day' + dayNumber);
  },

  change: function (dayNumber, text) {
    flatFileDb.put('day' + dayNumber, text);
  }

};

module.exports = db;