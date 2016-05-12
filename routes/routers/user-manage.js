'use strict';

var express = require('express');
var router = express.Router();
var UserManageController = require('../../controllers/usermanage-controller');
var userManageController = new UserManageController();

router.get('/', userManageController.getAllUserList);
router.get('/user', userManageController.getUserInfo);
router.put('/user', userManageController.updateUserInfo);
router.post('/user', userManageController.addUserInfo);
router.delete('/user', userManageController.deleteUserInfo);

module.exports = router;
