'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;

function EducateController() {}

EducateController.prototype.getAnimes = (req, res, next) => {

    //查找教育
    var query = Video.find({
        category: '教育',
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

module.exports = EducateController;
