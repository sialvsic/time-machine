'use strict';

var express = require('express');
var router = express.Router();
var OriginalController = require('../../controllers/original-controller');
var originalController = new OriginalController();

router.get('/', originalController.getOriginals);

module.exports = router;
