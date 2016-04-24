'use strict';
var constant = require('../mixin/constant');
var Vedio = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;


function MovieController() {

}

MovieController.prototype.getMovies = (req, res, next) => {

  //查找电影
  Vedio.find({category: '电影'}, ('screenshotsPath title description label'), (err, doc)=> {
    if (err) return next(err);
    res.send(doc);
  })
};

module.exports = MovieController;
