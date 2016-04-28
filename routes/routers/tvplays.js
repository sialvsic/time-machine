'use strict';

var express = require('express');
var router = express.Router();
var TVplayController = require('../../controllers/tvplay-controller');
var tvplayController = new TVplayController();

router.get('/', tvplayController.getTVplays);

module.exports = router;