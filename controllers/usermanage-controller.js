'use strict';
var constant = require('../mixin/constant');
var Video = require('../models/video');
var User = require('../models/user');
var constant = require('../mixin/constant');
var async = require('async');
var mongoose = require('mongoose');
var md5 = require('js-md5');

function UserManageController() {

}

UserManageController.prototype.getAllUserList = (req, res, next) => {

    var type = req.query.type;
    var key = req.query.key;
    var page = req.query.page;

    var doc = {};
    var length;

    async.waterfall([
        (done) => {
            if (type === 'all') {
                User.find({}, done);
            } else {
                if (key === '') {
                    User.find({}, done);
                } else {
                    var reg = new RegExp(key, 'i');
                    var obj = {
                        [type]: reg
                    }
                    User.find(obj, done);
                }
            }

        }, (data, done) => {
            length = data.length;
            var itemPerPage = constant.itemPerPage.user; //4
            var skip = itemPerPage * (page - 1);
            var query;

            if (type === 'all') {
                query = User.find({}, ('name gender major degree school mobilePhone email'));
            } else {
                if (key === '') {
                    query = User.find({}, ('name gender major degree school mobilePhone email'));
                } else {
                    var reg = new RegExp(key, 'i');
                    var obj = {
                        [type]: reg
                    }
                    query = User.find(obj, ('name gender major degree school mobilePhone email'));
                }
            }

            // var query = User.find({}, ('name gender major degree school mobilePhone email'));
            //skip 跳过x个
            //limit 读取x个
            query.skip(skip).limit(itemPerPage).exec('find', done);
        }

    ], (err, doc) => {
        if (err) return next(err);
        var respose = Object.assign({}, {
            doc: doc
        }, {
            allDatalength: length
        });
        console.log(respose);
        res.send(respose);

    });
};

UserManageController.prototype.getUserInfo = (req, res, next) => {
    var userId = req.query.userId;
    User.findOne({
        _id: mongoose.Types.ObjectId(userId)
    }, ('name gender school major degree email mobilePhone'), (err, doc) => {
        if (err) return next(err);
        res.send(doc);
    });
};

UserManageController.prototype.updateUserInfo = (req, res, next) => {
    var userId = req.body._id;
    var userData = req.body;

    User.findOne({
        _id: mongoose.Types.ObjectId(userId)
    }, (err, doc) => {
        if (err) {
            return next(err);
        } else {
            doc.school = userData.school;
            doc.name = userData.name;
            doc.mobilePhone = userData.mobilePhone;
            doc.email = userData.email;
            doc.gender = userData.gender;
            doc.major = userData.major;
            doc.degree = userData.degree;
            doc.save((err, data, affectline) => {
                if (err) return next(err);
                res.end();
            })
        }
    });
};

UserManageController.prototype.deleteUserInfo = (req, res, next) => {
    var userId = req.body.id;

    User.remove({
        _id: mongoose.Types.ObjectId(userId)
    }, (err, doc) => {
        if (err) return next(err);
        res.end();
    });
};

UserManageController.prototype.addUserInfo = (req, res, next) => {
    var userData = req.body;
    userData.password = md5(userData.password);

    var user = new User(userData);
    user.save(function(err, doc) {
        if (err) return next(err);
        res.end();
    });

};


module.exports = UserManageController;
