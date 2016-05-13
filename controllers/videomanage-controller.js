'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
// var User = require('../models/user');
var constant = require('../mixin/constant');
var async = require('async');
var mongoose = require('mongoose');
var md5 = require('js-md5');

function VideoManageController() {

}

VideoManageController.prototype.getAllVideoList = (req, res, next) => {

    var type = req.query.type;
    var key = req.query.key;
    var page = req.query.page;
    console.log(type);
    console.log(key);
    console.log(key === null);
    console.log(key === '');

    console.log(page);


    var doc = {};
    var length;

    async.waterfall([
        (done) => {
            if (type === 'all') {
                Video.find({}, done);
            } else {
                if (key === '') {
                    Video.find({}, done);
                } else {
                    var reg = new RegExp(key, 'i');
                    var obj = {
                        [type]: reg
                    }
                    Video.find(obj, done);
                }
            }

        }, (data, done) => {
            length = data.length;
            var itemPerPage = constant.itemPerPage.video; //4
            var skip = itemPerPage * (page - 1);
            var query;

            if (type === 'all') {
                query = Video.find({}, ('title extension size category label description createTime'));
            } else {
                if (key === '') {
                    query = Video.find({}, ('title extension size category label description createTime'));
                } else {
                    var reg = new RegExp(key, 'i');
                    var obj = {
                        [type]: reg
                    }
                    query = Video.find(obj, ('title extension size category label description createTime'));
                }
            }

            // var query = User.find({}, ('name gender major degree school mobilePhone email'));
            //skip 跳过x个
            //limit 读取x个
            query.skip(skip).limit(itemPerPage).exec('find', done);
        }

    ], (err, doc) => {
        if (err) return next(err);
        var respose = Object.assign({}, {
            doc: doc
        }, {
            allDatalength: length
        });
        console.log(respose);
        res.send(respose);

    });
};

VideoManageController.prototype.getVideoInfo = (req, res, next) => {
    var videoId = req.query.videoId;
    Video.findOne({
        _id: mongoose.Types.ObjectId(videoId)
    }, ('title extension size category label description createTime'), (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
};

VideoManageController.prototype.updateVideoInfo = (req, res, next) => {
    var videoId = req.body._id;
    var videoData = req.body;
    console.log(videoId);
    console.log(videoData);


    Video.findOne({
        _id: mongoose.Types.ObjectId(videoId)
    }, (err, doc) => {
        if (err) {
            return next(err);
        } else {
            doc.title = videoData.title;
            doc.extension = videoData.extension;
            doc.size = videoData.size;
            doc.category = videoData.category;
            doc.label = videoData.label;
            doc.description = videoData.description;
            doc.save((err, data, affectline) => {
                if (err) return next(err);
                res.end();
            })
        }
    });
};

VideoManageController.prototype.deleteVideoInfo = (req, res, next) => {
    var videoId = req.body.id;

    Video.remove({
        _id: mongoose.Types.ObjectId(videoId)
    }, (err, doc) => {
        if (err) return next(err);
        res.end();
    });
};

VideoManageController.prototype.addVideoInfo = (req, res, next) => {
    var videoData = req.body;
    videoData.password = md5(videoData.password);

    var user = new User(videoData);
    user.save(function(err, doc) {
        if (err) return next(err);
        res.end();
    });

};


module.exports = VideoManageController;
