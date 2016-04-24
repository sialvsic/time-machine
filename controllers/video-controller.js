'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');


function VideoController() {

}

VideoController.prototype.getVideo = (req, res, next) => {
  var videoId = req.params.videoId;

  //根据videoId 去查找 视频资源
  Video.findById(videoId, ('mimetype path'), (err, doc)=> {
    if (err) return next(err);
    res.send(doc);
  });
};

module.exports = VideoController;
