'use strict';
var constant = require('../mixin/constant');
var Vedio = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;


function TVplayController() {

}

TVplayController.prototype.getTVplays = (req, res, next) => {

    //查找电视剧
    var query = Vedio.find({
        category: '电视剧',
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

module.exports = TVplayController;
