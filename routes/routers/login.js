'use strict';

var express = require('express');
var router = express.Router();
var constant = require('../../mixin/constant').backConstant;
var lang = require('../../mixin/lang-message/chinese');
var md5 = require('js-md5');
var validate = require('validate.js');
var constraint = require('../../mixin/login-constraint');
var httpStatus = require('../../mixin/constant').httpCode;

var User = require('../../models/user');

function checkLoginInfo(account, password) {
  var pass = true;
  var valObj = {};

  valObj.email = account;
  valObj.mobilePhone = account;
  valObj.loginPassword = password;
  var result = validate(valObj, constraint);

  if (!(result.email || result.mobilePhone)) {
    pass = false;
  }

  if (password.length < constant.PASSWORD_MIN_LENGTH ||
      password.length > constant.PASSWORD_MAX_LENGTH) {
    pass = false;
  }
  return pass;
}

//登录
router.post('/', (req, res, next)=> {
  var account = req.body.account;
  var password = req.body.password;

  if (!checkLoginInfo(account, password)) {
    res.send({
      message: lang.LOGIN_FAILED,
      status: 403
    });
  } else {
    password = md5(password);

    //根据输入的account 来判断是邮箱还是手机号
    //查询mongodb 确定是否存在该账户,然后设置session
    if (account.indexOf('@') !== -1) {
      //说明是邮箱
      User.findOne({email: account}, (err, doc)=> {
        if (err) {
          next(err);
          return;
        } else {
          if (doc !== null && doc.password === password) {
            req.session.user = {
              id: doc._id
              //userInfo: result.body.userInfo,
              //token: result.headers.token
            };
            res.send({
              status: httpStatus.OK  //200 代表已经注册
            })
          } else {
            res.send({
              status: httpStatus.NOT_FOUND  //404 代表未注册
            })
          }
        }
      });
    } else {
      //手机号
      User.findOne({mobilePhone: account}, (err, doc)=> {
        if (err) {
          next(err);
          return;
        } else {
          if (doc !== null && doc.password === password) {
            req.session.user = {
              id: doc._id
              //userInfo: result.body.userInfo,
              //token: result.headers.token
            };
            res.send({
              status: httpStatus.OK  //200 代表已经注册
            })
          } else {
            res.send({
              status: httpStatus.NOT_FOUND  //404 代表未注册
            })
          }
        }
      });
    }
  }
});

module.exports = router;
