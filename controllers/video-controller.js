'use strict';

var mongoose = require('mongoose');
var async = require('async');
var moment = require('moment');
var path = require('path');
var constant = require('../mixin/constant');
var Video = require('../models/video');
var User = require('../models/user');


function VideoController() {

}

//播放获取视频信息
VideoController.prototype.getVideo = (req, res, next) => {
    // var userId = req.session.user.id;
    var isUserExist = false;
    if (req.session.user) {
        isUserExist = true;
        var userId = req.session.user.id;
    }
    var videoId = req.params.videoId;
    var videoInfo = {};
    var starStatus = false;
    var thumbsupStatus = false;

    async.waterfall([
        (done) => {
            //根据videoId 去查找 视频资源

            Video.findById(videoId, ('mimetype path thumbupNumber playNumber'), done)

        }, (data, done) => {

            videoInfo.thumbupNumber = data.thumbupNumber;
            videoInfo.path = data.path;
            videoInfo.mimetype = data.mimetype;
            videoInfo._id = data._id;
            videoInfo.playNumber = data.playNumber++;

            //将此视频到播放数量+1,保存
            data.save((err,doc,effect)=>{
              //然后查找用户,更新用户的点赞列表

              if (isUserExist) {
                  User.findOne({
                      _id: userId
                  }, done);
              } else {
                  done(true, null)
              }
            });

        }, (data, done) => {
            var star = data.star.find((item) => {
                return item.toString() === videoId;
            });

            if (star) {
                starStatus = true;
            }

            var thumbsup = data.thumbsup.find((item) => {
                return item.toString() === videoId;
            });

            if (thumbsup) {
                thumbsupStatus = true;
            }

            done(null, null);
        }
    ], (err, data) => {

        if (err && err !== true) return next(err);

        var videoNewInfo = Object.assign({}, videoInfo, {
            thumbsupStatus: thumbsupStatus
        }, {
            starStatus: starStatus
        });
         console.log(videoNewInfo);
        res.send(videoNewInfo);
    });
};

//设置点赞的相关视频和用户的状态
VideoController.prototype.setThumbsUpStatus = (req, res, next) => {
    var userId = req.session.user.id;
    var thumbsUpStatus = req.body.thumbsupStatus;
    var videoId = req.params.videoId;
    videoId = mongoose.Types.ObjectId(videoId);

    async.waterfall([
        (done) => {
            //根据videoId 去查找video  更新 thumbupNumber数量
            Video.findById(videoId, done);
        }, (data, done) => {

            if (thumbsUpStatus) {
                data.thumbupNumber = data.thumbupNumber + 1;
            } else {
                data.thumbupNumber = data.thumbupNumber - 1;
            }
            data.save((err, doc, affectLine) => {
                done(err, doc);
            });

        }, (data, done) => {
            //然后查找用户,更新用户的点赞列表
            User.findOne({
                _id: userId
            }, done);
        }, (data, done) => {

            if (thumbsUpStatus) {
                data.thumbsup.push(videoId);
            } else {
                //删除点赞列表
                var index = data.thumbsup.indexOf(videoId);
                if (index > -1) {
                    data.thumbsup.splice(index, 1);
                }
            }
            data.save((err, doc, affectLine) => {
                done(err, doc);
            });
        }
    ], (err, data) => {
        if (err) return next(err);
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
        (done) => {
            //然后查找用户,更新用户的收藏列表
            User.findOne({
                _id: userId
            }, done);

        }, (data, done) => {
            if (starStatus) {
                data.star.push(videoId);
            } else {
                var index = data.star.indexOf(videoId);
                if (index > -1) {
                    //删除收藏列表
                    data.star.splice(index, 1);
                }
            }
            data.save((err, doc, affectLine) => {
                done(err, doc);
            });
        }
    ], (err, data) => {
        if (err) return next(err);
        res.end()

    });

};

//下载视频
VideoController.prototype.download = (req, res, next) => {

    var videoId = req.params.videoId;
    videoId = mongoose.Types.ObjectId(videoId);

    async.waterfall([
        (done) => {
            //然后查找用户,更新用户的收藏列表
            Video.findOne({
                _id: videoId
            }, done);
        }
    ], (err, data) => {
        if (err) return next(err);

        var file = __dirname + '/../' + data.path;
        file = path.resolve(file);
        var preName = data.path.split('video/')[1];
        var fileName = '[时光机]-' + preName;
        res.download(file, fileName);

    });

};

//获取slide的全站点击量最高的视频
VideoController.prototype.popVideo = (req, res, next) => {

    //查找所有视频中点击量最高的
    var query = Video.find({
        isChecked: true
    }, ('highScreenshotsPath title description label playNumber'));

    query.sort('-playNumber').limit(5).exec('find', (err,doc)=>{
      if (err) {
        return next(err);
      }
      var arr = doc.map((item)=>{
        return item.highScreenshotsPath;
      });

      var idList = doc.map((item)=>{
        return item._id;
      })
       console.log(arr);
      res.send({
        popList:arr,
        idList:idList
      });
    });

};

module.exports = VideoController;
