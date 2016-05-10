'use strict';
var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var User = require('../models/user');
var httpStatus = require('../mixin/constant').httpCode;

function UserCenterController() {
}

UserCenterController.prototype.getUserDetail = (req, res, next) => {

  var userId = req.session.user.id;
  var result;

  //如果session存在,去查询这个session的user.id的用户名  以邮箱的形式返回
  User.findOne({_id: mongoose.Types.ObjectId(userId)}, ('mobilePhone email major gender school degree name'), (err, doc)=> {
    if (err) {
      return next(err)
    }
    console.log(doc);
    res.send(doc);
  });

};

UserCenterController.prototype.updateUserDetail = (req, res, next) => {

  var userId = req.session.user.id;
  var userData = req.body.data;
  console.log(userData);
  var result;

  //如果session存在,去查询这个session的user.id的用户名  以邮箱的形式返回
  User.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId)}, userData, (err, doc)=> {
    if (err) {
      return next(err)
    }
    console.log(doc);
    res.end();
  });

};

module.exports = UserCenterController;
