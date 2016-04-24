'use strict';

var express = require('express');
var router = express.Router();
var VideoController = require('../../controllers/video-controller');
var videoController = new VideoController();

router.get('/:videoId', videoController.getVideo);

module.exports = router;