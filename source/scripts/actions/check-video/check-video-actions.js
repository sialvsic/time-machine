'use strict';

var Reflux = require('reflux');

var CheckVideoActions = Reflux.createActions([
  'getAllCheckVideoList',
  'getVideoInfo',
  'updateVideoInfo',
  'deleteVideoInfo',
  'checkVideoPass'
]);

module.exports = CheckVideoActions;
