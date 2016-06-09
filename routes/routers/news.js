'use strict';

var express = require('express');
var router = express.Router();
var NewController = require('../../controllers/new-controller');
var newController = new NewController();

router.get('/', newController.getNews);

module.exports = router;
