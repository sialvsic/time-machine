'use strict';
var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var User = require('../models/user');
var httpStatus = require('../mixin/constant').httpCode;
var md5 = require('js-md5');
var async = require('async');

function UserCenterController() {}

UserCenterController.prototype.getUserDetail = (req, res, next) => {

    var userId = req.session.user.id;
    var result;

    //如果session存在,去查询这个session的user.id的用户名  以邮箱的形式返回
    User.findOne({
        _id: mongoose.Types.ObjectId(userId)
    }, ('mobilePhone email major gender school degree name'), (err, doc) => {
        if (err) {
            return next(err);
        }
        res.send(doc);
    });

};

UserCenterController.prototype.updateUserDetail = (req, res, next) => {

    var userId = req.session.user.id;
    var userData = req.body.data;
    var result;

    //如果session存在,去查询这个session的user.id的用户名  以邮箱的形式返回
    User.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(userId)
    }, userData, (err, doc) => {
        if (err) {
            return next(err);
        }
        res.end();
    });

};

UserCenterController.prototype.changePassword = (req, res, next) => {

    var userId = req.session.user.id;
    var passwordInfo = req.body.data;
    //  {
    //    oldPassword: '12345678',
    //    newPassword: '1234567890',
    //    confirmPassword: '1234567890' }

    //存在以下几种可能
    //两次输入的密码不一致  else
    //旧密码错误   403
    //成功  200
    var result = {};
    async.waterfall([
        (done) => {
            if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
                result.status = constant.httpCode.PRECONDITION_FAILED;
                done(true, result);
            } else {
                done(null, null);
            }
        }, (data, done) => {
            User.findOne({
                _id: mongoose.Types.ObjectId(userId)
            }, done);
        }, (data, done) => {
            if (data.password !== md5(passwordInfo.oldPassword)) {
                result.status = constant.httpCode.BAD_REQUEST;
                done(true, result);
            } else {
                data.password = md5(passwordInfo.newPassword);
                data.save((err, data, line) => {
                    done(err, data);
                });
            }
        }
    ], (err, doc) => {
        if (err && err !== true) {
            return next(err);
        } else if (err) {
            res.send(doc);
        } else {
            res.send({
                status: constant.httpCode.OK
            });
        }

    });
};

module.exports = UserCenterController;
