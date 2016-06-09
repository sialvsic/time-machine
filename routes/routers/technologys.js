'use strict';

var express = require('express');
var router = express.Router();
var TechnologyController = require('../../controllers/technology-controller');
var technologyController = new TechnologyController();

router.get('/', technologyController.getTechnology);

module.exports = router;
