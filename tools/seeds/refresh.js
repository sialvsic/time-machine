'use strict';

var mongoose = require('mongoose');
var User = require('../../models/user');

var async = require('async');

var yamlConfig = require('node-yaml-config');

var config = yamlConfig.load(__dirname + '/../../config/config.yml');

mongoose.connect(config.database);
var db = mongoose.connection;

db.once('open', () => {
  console.log('mongo refresh start...');

  async.waterfall([
    (done) => {
      User.remove(function () {
        User.create([
          {
            email: '11111111@qq.com',
            mobilePhone: '13111111111',
            password: '25d55ad283aa400af464c76d713c07ad',
            creatData: '1451117203'
          }, {
            email: '22222222@qq.com',
            mobilePhone: '13122222222',
            password: '25d55ad283aa400af464c76d713c07ad',
            creatData: '1451117223'
          }, {
            email: '33333333@qq.com',
            mobilePhone: '13133333333',
            password: '25d55ad283aa400af464c76d713c07ad',
            creatData: '1451117223'
          }, {
            email: '44444444@qq.com',
            mobilePhone: '13144444444',
            password: '25d55ad283aa400af464c76d713c07ad',
            creatData: '1451117223'
          }
        ], function () {
          console.log('mongo refresh end.');
          done(null);
        });
      });
    }
  ], () => {
    process.exit();
  });
});
