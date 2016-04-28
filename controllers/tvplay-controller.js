'use strict';
var constant = require('../mixin/constant');
var Vedio = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;


function TVplayController() {

}

TVplayController.prototype.getTVplays = (req, res, next) => {

  //查找电视剧
  Vedio.find({category: '电视剧'}, ('screenshotsPath title description label'), (err, doc)=> {
    if (err) return next(err);
    res.send(doc);
  })
};

module.exports = TVplayController;
