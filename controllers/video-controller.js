'use strict';

var mongoose = require('mongoose');
var async = require('async');

var constant = require('../mixin/constant');
var Video = require('../models/video');
var User = require('../models/user');


function VideoController() {

}

VideoController.prototype.getVideo = (req, res, next) => {
  var videoId = req.params.videoId;

  //根据videoId 去查找 视频资源
  Video.findById(videoId, ('mimetype path'), (err, doc)=> {
    if (err) return next(err);
    console.log(doc);
    res.send(doc);
  });
};


//设置点赞的相关视频和用户的状态
VideoController.prototype.setThumbsUpStatus = (req, res, next) => {
  var userId = req.session.user.id;
  var thumbsUpStatus = req.body.thumbsupStatus;
  var videoId = req.params.videoId;
  videoId = mongoose.Types.ObjectId(videoId);

  async.waterfall([
    (done)=> {
      //根据videoId 去查找video  更新 thumbupNumber数量
      Video.findById(videoId, done);
    }, (data, done)=> {

      if (thumbsUpStatus) {
        data.thumbupNumber = data.thumbupNumber + 1;
      } else {
        data.thumbupNumber = data.thumbupNumber - 1;
      }
      data.save((err, doc, affectLine)=> {
        done(err, doc);
      });

    }, (data, done)=> {
      //然后查找用户,更新用户的点赞列表
      User.findOne({_id: userId}, done);
    }, (data, done)=> {

      if (thumbsUpStatus) {
        data.thumbsup.push(videoId);
      } else {
        var index = data.thumbsup.indexOf(videoId);
        if (index > -1) {
          data.thumbsup.splice(index, 1);
        }
      }
      data.save((err, doc, affectLine)=> {
        done(err, doc);
      });
    }
  ], (err, data)=> {
    if (err)  return next(err);
    res.end()

  });

};

//设置收藏的相关视频和用户的状态
VideoController.prototype.setStarStatus = (req, res, next) => {
  var userId = req.session.user.id;
  var starStatus = req.body.starStatus;
  var videoId = req.params.videoId;
  videoId = mongoose.Types.ObjectId(videoId);

  async.waterfall([
    (done)=> {
      //然后查找用户,更新用户的收藏列表
      User.findOne({_id: userId}, done);

    }, (data, done)=> {
      if (starStatus) {
        data.star.push(videoId);
      } else {
        var index = data.star.indexOf(videoId);
        if (index > -1) {
          data.star.splice(index, 1);
        }
      }
      data.save((err, doc, affectLine)=> {
        done(err, doc);
      });
    }
  ], (err, data)=> {
    if (err)  return next(err);
    res.end()

  });

};

module.exports = VideoController;
