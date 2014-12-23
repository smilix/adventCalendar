'use strict';

var express = require('express');
var controller = require('./image.controller');
var authCheck = require('../../components/authCheck');

var router = express.Router();

router.get('/', controller.index);
router.post('/upload', authCheck.forAdmin(controller.upload));
router.post('/fromUrl', authCheck.forAdmin(controller.fromUrl));

module.exports = router;