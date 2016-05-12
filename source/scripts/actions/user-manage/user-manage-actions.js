'use strict';

var Reflux = require('reflux');

var UserManageActions = Reflux.createActions([
  'getAllUserList',
  'getUserInfo',
  'updateUserInfo',
  'deleteUserInfo'
]);

module.exports = UserManageActions;
