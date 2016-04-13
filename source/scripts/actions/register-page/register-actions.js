'use strict';

var Reflux = require('reflux');

var RegisterActions = Reflux.createActions([
  'register',
  'checkEmail',
  'checkMobilePhone',
  'changeState',
  'inputPassword',
  'checkData'
]);

module.exports = RegisterActions;
