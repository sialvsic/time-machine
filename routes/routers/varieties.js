'use strict';

var express = require('express');
var router = express.Router();
var VarietyController = require('../../controllers/variety-controller');
var varietyController = new VarietyController();

router.get('/', varietyController.getVarieties);

module.exports = router;
