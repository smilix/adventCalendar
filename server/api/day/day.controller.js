'use strict';

var _ = require('lodash');
var db = require('../../data/db.js');

//exports.index = function(req, res) {
//  res.json([]);
//};

exports.getCurrentDate = function (req, res) {
  res.json({
    now: Date.now()
  });
};

exports.getDayStatusList = function (req, res) {
  res.json(db.getDayStatusList());
};

exports.getDay = function (req, res) {
  res.json(db.getDay(req.params.day));
};

exports.setDay = function (req, res) {
  db.change(req.params.day, req.body.content);
  res.json([]);
};