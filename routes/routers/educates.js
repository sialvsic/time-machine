'use strict';

var express = require('express');
var router = express.Router();
var EducateController = require('../../controllers/educate-controller');
var educateController = new EducateController();

router.get('/', educateController.getEducates);

module.exports = router;
