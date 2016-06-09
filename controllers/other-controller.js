'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');

function OtherController() {}

OtherController.prototype.getOthers = (req, res, next) => {

    //查找其他
    var query = Video.find({
        category: '其他',
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

module.exports = OtherController;
