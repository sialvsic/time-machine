'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./config/config.yml');

var userSchema = new Schema({
  email: String,                //邮箱
  mobilePhone: String,          //手机号
  password: String,             //密码
  createTime: Number,           //该用户创建的时间
  thumbsup: [{type: Schema.Types.ObjectId, default: []}],         //点赞的视频
  star: [{type: Schema.Types.ObjectId, default: []}]              //收藏的视频
});

module.exports = mongoose.model('users', userSchema);
