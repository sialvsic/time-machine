'use strict';

var express = require('express');
var router = express.Router();
var lang = require('../../mixin/lang-message/chinese');
var constant = require('../../mixin/constant').backConstant;
var async = require('async');
var validate = require('validate.js');
var md5 = require('js-md5');
var constraint = require('../../mixin/register-constraint');
var httpStatus = require('../../mixin/constant').httpCode;

var User = require('../../models/user');

function checkRegisterInfo(registerInfo) {
  var pass = true;

  var valObj = {};
  valObj.email = registerInfo.email;
  valObj.mobilePhone = registerInfo.mobilePhone;
  valObj.password = registerInfo.password;

  var result = validate(valObj, constraint);

  if (result !== undefined) {
    pass = false;
  }

  if (registerInfo.password.length < constant.PASSWORD_MIN_LENGTH ||
      registerInfo.password.length > constant.PASSWORD_MAX_LENGTH) {
    pass = false;
  }
  return pass;
}

//注册
router.post('/', (req, res, next) => {
  var registerInfo = req.body;
  var result = {};
  result.data = {};

  if (checkRegisterInfo((registerInfo))) {

    var isMobilePhoneExist;
    var isEmailExist;
    async.waterfall([
      (done)=> {
        //第一步去数据库中查询看是否有该手机号

        User.find({mobilePhone: registerInfo.mobilePhone}, (err, doc)=> {
          if (err) {
            done(err, null);
          }
          if (doc.length !== 0) {
            isMobilePhoneExist = true;
          }
          done(null, null);
        })
      }, (data, done)=> {
        //第二步去数据库中查询看是否有该邮箱

        User.find({email: registerInfo.email}, (err, doc)=> {
          if (err) {
            done(err, null);
          }
          if (doc.length !== 0) {
            isEmailExist = true;
          }
          done(null, null);
        })
      }, (data, done)=> {
        //如果有电话或者邮箱存在就抛错
        if (isMobilePhoneExist || isEmailExist) {
          done(true, null);
        } else {
          done(null, null);
        }
      }, (data, done)=> {
        registerInfo.password = md5(registerInfo.password);
        var user = new User(registerInfo);
        user.save(function (err, doc) {  //参数3个
          done(null, doc);
        });
      }, (data, done)=> {
        //记录一条登录信息
        done(null, data);
      }, (data, done)=> {
        //设置session
        req.session.user = {
          id: data._id
          //userInfo: '12'
          //token: data.headers.token
        };
        done(null, null);
      }
    ], (err, data)=> {
      if (err === true) {
        res.send({
          status: constant.FAILING_STATUS,
          message: lang.EXIST,
          data: {
            isEmailExist: isEmailExist,
            isMobilePhoneExist: isMobilePhoneExist
          }
        });
      } else if (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          message: lang.REGISTER_FAILED,
          status: constant.SERVER_ERROR
        });
      } else {
        res.send({
          status: httpStatus.OK,
          message: lang.REGISTER_SUCCESS
        });
      }
    })
  }

});

//查找mongodb数据库,看是否有已经注册的手机号
router.get('/validate-mobile-phone', (req, res, next) => {

  var mobilePhone = req.query.mobilePhone;

  User.find({mobilePhone: mobilePhone}, (err, doc)=> {
    if (err) {
      next(err);
      return;
    } else {
      if (doc.length === 0) {
        res.send({
          status: httpStatus.NOT_FOUND  //404 代表未注册
        })
      } else {
        res.send({
          status: httpStatus.OK  //200 代表已经注册
        })
      }
    }
  });

});

//查找mongodb数据库,看是否有已经注册的邮箱
router.get('/validate-email', (req, res, next)=> {
  var email = req.query.email;

  User.find({email: email}, (err, doc)=> {
    if (err) {
      next(err);
      return;
    } else {
      if (doc.length === 0) {
        res.send({
          status: httpStatus.NOT_FOUND  //404 代表未注册
        })
      } else {
        res.send({
          status: httpStatus.OK  //200 代表已经注册
        })
      }
    }
  });
});
module.exports = router;