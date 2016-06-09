'use strict';

var express = require('express');
var router = express.Router();
var MusicController = require('../../controllers/music-controller');
var musicController = new MusicController();

router.get('/', musicController.getMusics);

module.exports = router;
