'use strict';

var express = require('express');
var controller = require('./day.controller');
var authCheck = require('../../components/authCheck');

var router = express.Router();

//router.get('/', controller.index);
router.get('/now', controller.getCurrentDate);
router.get('/statusList', controller.getDayStatusList);
router.get('/:day', controller.getDay);
router.put('/:day', authCheck.forAdmin(controller.setDay));

module.exports = router;