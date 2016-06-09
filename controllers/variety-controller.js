'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;

function VarietyController() {}

VarietyController.prototype.getVarieties = (req, res, next) => {

    //查找综艺
    var query = Video.find({
        category: '综艺',
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

module.exports = VarietyController;
