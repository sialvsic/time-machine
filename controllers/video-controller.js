'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');


function VideoController() {

}

VideoController.prototype.getVideo = (req, res, next) => {
  console.log(req.params.videoId);
  console.log('11111111');

  //console.log(' find movie');
  ////查找电影
  //Video.find({category: '电影'}, ('screenshotsPath title description label'), (err, doc)=> {
  //  if (err) return next(err);
  //  console.log(doc);
  //  res.send(doc);
  //})
};

module.exports = VideoController;
