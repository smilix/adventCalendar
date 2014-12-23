'use strict';

var config = require('../config/environment');
var auth = require('basic-auth');

var realm = 'Adventskalender';


function check(req, res, credentials) {
  var user = auth(req);

  var valid = false;
  if (user !== undefined) {
    valid = credentials.some(function (credential) {
      return user.name === credential.user && user.pass === credential.password;
    });
  }

  if (!valid) {
    console.log('Invalid authentication.');
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="' + realm + '"');
    res.end('Unauthorized');
    return false;
  }
  else {
    return true;
  }
}


function adminCheck(privilegedFn) {

  return function (req, res, next) {
    if (check(req, res, [config.access.admin])) {
      privilegedFn(req, res, next);
    }
  };
}

function allCheckAsUse(req, res, next) {

  if (!config.access.allUserEnabled) {
    return next();
  }

  if (check(req, res, [config.access.all, config.access.admin])) {
    next();
  }
}

module.exports = {
  forAdmin: adminCheck,
  all: allCheckAsUse
};