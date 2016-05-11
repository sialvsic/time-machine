'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./config/config.yml');

var userSchema = new Schema({
  email: {type: String, default: ''},                //邮箱
  mobilePhone: {type: String, default: ''},          //手机号
  password: {type: String, default: ''},             //密码
  major: {type: String, default: ''},                //专业
  gender: {type: String, default: 'M'},               //性别
  school: {type: String, default: ''},               //学校
  degree: {type: String, default: ''},               //学历
  name: {type: String, default: ''},                 //姓名
  createTime: Number,           //该用户创建的时间
  thumbsup: [{type: Schema.Types.ObjectId, ref: 'vedios'}],         //点赞的视频
  star: [{type: Schema.Types.ObjectId, ref: 'vedios'}],              //收藏的视频
  role: {type: Number, default: 1}                  //用户权限等级 1为普通用户， 2为管理员用户
});

module.exports = mongoose.model('users', userSchema);
