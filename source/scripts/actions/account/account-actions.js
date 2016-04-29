'use strict';

var Reflux = require('reflux');

var AccountActions = Reflux.createActions([
  'loadAccount',
  'logout'
]);

module.exports = AccountActions;
