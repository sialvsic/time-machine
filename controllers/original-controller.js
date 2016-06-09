'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');

function OriginalController() {}

OriginalController.prototype.getOriginals = (req, res, next) => {

    //查找原创
    var query = Video.find({
        category: '原创',
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

module.exports = OriginalController;
