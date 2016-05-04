'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var CategoryMoreController = require('../../controllers/categorymore-controller');
var categoryMoreController = new CategoryMoreController();

router.get('/', categoryMoreController.getCategoryMore);


module.exports = router;
