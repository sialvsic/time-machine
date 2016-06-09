'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');

function SchoolController() {}

SchoolController.prototype.getSchools = (req, res, next) => {

    //查找校园
    var query = Video.find({
        category: '校园',
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

module.exports = SchoolController;
