'use strict';

var Reflux = require('reflux');

var VideoManageActions = Reflux.createActions([
  'getAllVideoList',
  'getVideoInfo',
  'updateVideoInfo',
  'deleteVideoInfo',
  'addVideoInfo'
]);

module.exports = VideoManageActions;
