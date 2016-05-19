'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var httpStatus = require('../mixin/constant').httpCode;

function MovieController() {}

MovieController.prototype.getMovies = (req, res, next) => {

    //查找电影
    Video.find({
        category: '电影',
        isChecked: true
    }, ('lowScreenshotsPath title description label'), (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    })
};

module.exports = MovieController;

/*
title: 'there you will be',
    label: 'there',
    description: 'a new begin',
    screenshotsPath: '/screeshots/HD-Love Story 中英字幕 (老赵LD)--音悦Tai.png',
    _id: 572036125a58611910151e78 } ]

 { title: 'love story',
 label: 'heh',
 description: '1234',
 screenshotsPath: '/screeshots/HD-Love Story 中英字幕 (老赵LD)--音悦Tai.png',
 _id: 571b0473110d80a0c8bb5463 },

    */
