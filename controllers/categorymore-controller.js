'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var path = require('path');
var async = require('async');


function CategoryMoreController() {}

CategoryMoreController.prototype.getCategoryMore = (req, res, next) => {

    //获取更多类型
    //req.query
    //{ categorymore: '电影', page: '1' }

    var page = req.query.page;
    var category = req.query.categorymore;

    var doc = {};
    var length;

    async.waterfall([
        (done) => {
            Video.find({
                category: category,
                isChecked: true
            }, done);
        }, (data, done) => {
            length = data.length;
            var itemPerPage = constant.itemPerPage.movie;
            var skip = itemPerPage * (page - 1);

            var query = Video.find({
                category: category,
                isChecked: true
            }, ('createTime title label description category lowScreenshotsPath path'));
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
        }, {
            category: category
        });
        res.send(respose);
    });

};

module.exports = CategoryMoreController;
