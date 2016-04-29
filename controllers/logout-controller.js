'use strict';
var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var User = require('../models/user');
var httpStatus = require('../mixin/constant').httpCode;

function LogoutController() {
}

LogoutController.prototype.logout = (req, res, next) => {

  if (!req.session.user) {
    res.end();
    return;
  }

  req.session.destroy(function (err) {
    if (err)  return next(err);
    res.end();
  });
};

module.exports = LogoutController;
