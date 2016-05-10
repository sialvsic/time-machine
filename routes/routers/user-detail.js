'use strict';

var express = require('express');
var router = express.Router();
var UserCenterController = require('../../controllers/usercenter-controller');
var usercenterController = new UserCenterController();

router.get('/', usercenterController.getUserDetail);

module.exports = router;