'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');

function TechnologyController() {}

TechnologyController.prototype.getTechnology = (req, res, next) => {

    //查找科技
    var query = Video.find({
        category: '科技',
        isChecked: true
    }, ('lowScreenshotsPath title description label playNumber'));

    query.sort('-playNumber').limit(5).exec('find', (err,doc)=>{
      if (err) {
        return next(err);
      }
      res.send(doc);
    });
};

module.exports = TechnologyController;
