'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');

function MusicController() {}

MusicController.prototype.getMusics = (req, res, next) => {

    //查找音乐
    var query = Video.find({
        category: '音乐',
        isChecked: true
    }, ('lowScreenshotsPath title description label playNumber'));

    query.sort('-playNumber').limit(5).exec('find', (err,doc)=>{
      if (err) {
        return next(err);
      }
      res.send(doc);
    });
};

module.exports = MusicController;
