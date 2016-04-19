'use strict';

var mongoose = require('mongoose');
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load('./config/config.yml');

var _timeBase = 90;
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  mobilePhone: String,
  password: String,
  createTime: Number

});


module.exports = mongoose.model('users', userSchema);
