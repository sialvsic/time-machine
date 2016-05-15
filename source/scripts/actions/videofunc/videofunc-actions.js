'use strict';

var Reflux = require('reflux');

var VideofuncActions = Reflux.createActions([
  'setThumbsUpStatus',
  'setStarStatus',
  'getLoginStatus'
]);

module.exports = VideofuncActions;
