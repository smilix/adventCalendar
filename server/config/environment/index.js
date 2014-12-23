'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

var root = path.normalize(__dirname + '/../../..');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: root,

  // Server port
  port: process.env.PORT || 9000,

  flatDb: {
  },

  access: require('./accessData.js')

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
    require('./' + process.env.NODE_ENV + '.js') || {});