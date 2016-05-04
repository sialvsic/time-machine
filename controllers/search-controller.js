'use strict';
var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var Video = require('../models/video');
var path = require('path');


function SearchController() {
}

SearchController.prototype.getSearchResult = (req, res, next) => {

  //比较搓的方式 进行处理  待优化
  if (req.query.q) {
    res.sendFile(path.join(__dirname, '../public/', 'search.html'));
    return;
  }

  var serachContent = req.query.content;

  var reg = new RegExp(serachContent, 'i');


  Video.find({title: reg}, ('createTime title label description category screenshotsPath path'), (err, doc)=> {
    if (err)  return next(err);
    res.send(doc);
  })

};

module.exports = SearchController;
