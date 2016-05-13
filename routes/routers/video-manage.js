'use strict';

var express = require('express');
var router = express.Router();
var VideoManageController = require('../../controllers/videomanage-controller');
var videoManageController = new VideoManageController();

router.get('/', videoManageController.getAllVideoList);
router.get('/video', videoManageController.getVideoInfo);
router.put('/video', videoManageController.updateVideoInfo);
router.post('/video', videoManageController.addVideoInfo);
router.delete('/video', videoManageController.deleteVideoInfo);

module.exports = router;
