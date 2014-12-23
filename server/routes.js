/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var express = require('express');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/images', require('./api/image'));
  app.use('/api/days', require('./api/day'));



  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};