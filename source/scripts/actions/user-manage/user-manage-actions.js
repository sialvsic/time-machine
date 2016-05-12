'use strict';

var Reflux = require('reflux');

var UserManageActions = Reflux.createActions([
  'getAllUserList',
  'getUserInfo',
  'updateUserInfo',
  'deleteUserInfo',
  'addUserInfo'
]);

module.exports = UserManageActions;
