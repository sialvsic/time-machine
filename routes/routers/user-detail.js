'use strict';

var express = require('express');
var router = express.Router();
var UserCenterController = require('../../controllers/usercenter-controller');
var usercenterController = new UserCenterController();

router.get('/', usercenterController.getUserDetail);
router.put('/', usercenterController.updateUserDetail);
router.put('/change-password', usercenterController.changePassword);

module.exports = router;
