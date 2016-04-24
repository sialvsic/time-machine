'use strict';

var express = require('express');
var router = express.Router();
var AccountController = require('../../controllers/account-controller');
var accountController = new AccountController();

router.get('/', accountController.loadAccount);

module.exports = router;