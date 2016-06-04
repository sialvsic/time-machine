'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;


function TVplayController() {

}

TVplayController.prototype.getTVplays = (req, res, next) => {

    //查找电视剧
    var query = Video.find({
        category: '电视剧',
        isChecked: true
    }, ('lowScreenshotsPath title description label playNumber'));

    query.sort('-playNumber').limit(5).exec('find', (err,doc)=>{
      if (err) {
        return next(err);
      }
      res.send(doc);
    });
};

module.exports = TVplayController;
