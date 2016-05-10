'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var UserCenterSidebar = require('./user-center-sidebar.component');
var UserDetail = require('./user-center-detail.component');
var UserCenterGender = require('./user-center-gender.component');
var ChangePassword = require('./change-password.component');
var NewPassword = require('./new-password.component');

var UserCenterApp = React.createClass({

  render: function () {
    return (
        <div id="user-center-app" className="row container-fluid">
          <UserCenterSidebar/>
          <UserDetail>
            <UserCenterGender/>
          </UserDetail>
          <ChangePassword>
            <NewPassword initialStatus="userDetail"/>
          </ChangePassword>
        </div>
    );
  }
});

module.exports = UserCenterApp;