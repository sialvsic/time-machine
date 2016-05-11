'use strict';
var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var User = require('../models/user');
var httpStatus = require('../mixin/constant').httpCode;

function AccountController() {
}

AccountController.prototype.loadAccount = (req, res, next) => {

  if (req.session.user) {
    var userId = req.session.user.id;

    //如果session存在,去查询这个session的user.id的用户名  以邮箱的形式返回
    User.findOne({_id: mongoose.Types.ObjectId(userId)}, (err, doc)=> {
      if (err) {
        next(err);
        return;
      } else {
        if (doc !== null) {
          res.send({
            status: constant.httpCode.OK,
            account: doc.email,
            isAdmin: doc.role === 2 
          });
        } else {
          res.send({
            status: httpStatus.NOT_FOUND  //404 代表不存在该用户
          })
        }
      }
    });
  } else {
    res.send({status: constant.httpCode.ACCEPTED});
  }
};

module.exports = AccountController;
