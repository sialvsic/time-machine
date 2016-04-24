'use strict';

var express = require('express');
var router = express.Router();
var VedioController = require('../../controllers/vedio-controller');
var vedioController = new VedioController();

router.get('/vedio-play/:vedioId', vedioController.getVedio);

module.exports = router;