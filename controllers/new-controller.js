'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');

function NewController() {}

NewController.prototype.getNews = (req, res, next) => {

    //查找新闻
    var query = Video.find({
        category: '新闻',
        isChecked: true
    }, ('lowScreenshotsPath title description label playNumber'));

    query.sort('-playNumber').limit(5).exec('find', (err,doc)=>{
      if (err) {
        return next(err);
      }
      console.log(doc);
      res.send(doc);
    });
};

module.exports = NewController;
