'use strict';

var express = require('express');
var router = express.Router();
var OtherController = require('../../controllers/other-controller');
var otherController = new OtherController();

router.get('/', otherController.getOthers);

module.exports = router;
