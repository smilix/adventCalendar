'use strict';

var root = require('path').normalize(__dirname + '/../../..');

// Development specific configuration
// ==================================
module.exports = {

  flatDb: {
    file:  root + '/dev-flat.file.db'
  }
};
