'use strict';

var express = require('express');
var router = express.Router();
var VideoController = require('../../controllers/video-controller');
var videoController = new VideoController();

router.get('/:videoId', videoController.getVideo);
router.put('/:videoId/thumbsupStatus', videoController.setThumbsUpStatus);
router.put('/:videoId/starStatus', videoController.setStarStatus);
router.get('/download/:videoId', videoController.download);
router.get('/pop/top', videoController.popVideo);

module.exports = router;
