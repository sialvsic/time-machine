'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;

function AnimeController() {}

AnimeController.prototype.getAnimes = (req, res, next) => {

    //查找动漫
    var query = Video.find({
        category: '动漫',
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

module.exports = AnimeController;
