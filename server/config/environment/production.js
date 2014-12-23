'use strict';

var root = require('path').normalize(__dirname + '/../../..');

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  flatDb: {
    file:  root + '/flat.file.db'
  }
};