'use strict';

var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./config/config.yml');

var Schema = mongoose.Schema;

var vedioSchema = new Schema({
  userId: String,
  originalname: String,   //原始的视频文件名
  encoding: String,       //编码
  mimetype: String,       //多用途互联网邮件扩展类型
  path: String,           //存储视频的路径
  extension: String,      //扩展名
  size: String,           //文件大小
  truncated: {type: Boolean, default: false},       //是否进行压缩
  buffer: {type: String, default: false},           //是否是流媒体
  title: String,          //视频标题
  category: String,       //视频分类
  label: String,          //视频标签
  description: String,    //视频描述
  isDetailsInfoComplete: {type: Boolean, default: false},       //是否信息完整
  screenshotsPath: String,  //视频截图的文件
  createTime: Number,      //视频上传的时间
  isChecked: {type: Boolean, default: false}        //是否通过审查

});


module.exports = mongoose.model('vedios', vedioSchema);
