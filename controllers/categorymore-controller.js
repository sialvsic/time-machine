'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var path = require('path');
var async = require('async');


function MoviesmoreController() {
}

MoviesmoreController.prototype.getMoviesMore = (req, res, next) => {

  ////比较搓的方式 进行处理  待优化  原因:
  //if (req.query.q) {
  //  res.sendFile(path.join(__dirname, '../public/', 'search.html'));
  //  return;
  //}

  var serachContent = req.query.content;
  var page = req.query.page;

  var doc = {};
  var length;
  var reg = new RegExp(serachContent, 'i');

  async.waterfall([
    (done)=> {
      Video.find({title: reg}, done);
    }, (data, done)=> {
      length = data.length;
      var itemPerPage = constant.itemPerPage.search;
      var skip = itemPerPage * (page - 1);

      var query = Video.find({title: reg}, ('createTime title label description category screenshotsPath path'));
      //skip 跳过x个
      //limit 读取x个
      query.skip(skip).limit(itemPerPage).exec('find', done);
    }

  ], (err, doc)=> {
    if (err)  return next(err);
    var respose = Object.assign({}, {doc: doc}, {allDatalength: length});
    res.send(respose);

  });

};

module.exports = MoviesmoreController;
