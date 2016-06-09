'use strict';

var express = require('express');
var router = express.Router();
var SchoolController = require('../../controllers/school-controller');
var schoolController = new SchoolController();

router.get('/', schoolController.getSchools);

module.exports = router;
