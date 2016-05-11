'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var UserCenterSidebar = require('./user-center-sidebar.component');
var UserDetail = require('./user-center-detail.component');
var UserCenterGender = require('./user-center-gender.component');
var ChangePassword = require('./change-password.component');
var NewPassword = require('./new-password.component');
var UserCenterStar = require('./user-center-star.component');
var UserCenterActions = require('../../actions/user-center/user-center-actions');
var UserCenterStore = require('../../store/user-center/user-center-store');

var UserCenterApp = React.createClass({
    mixins: [Reflux.connect(UserCenterStore)],

  getInitialState:function(){
    return {
      starItemLength:0,
      starList: []
    }
  },

  componentWillMount :function(){
    var url = window.location.href.split('&&')[0];
    var mark = url.split('mark=')[1];
    var url2 = window.location.href.split('&&')[1];
    var page = url2 ? url2.split('page=')[1]:1;
    if(mark ==='star'){
      UserCenterActions.changeState(mark, 'currentState');
    }
    if(mark ==='userDetail'){
        UserCenterActions.changeState(mark, 'currentState');
    }

    UserCenterActions.loadStar(page);
  },

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
          <UserCenterStar starItemLength={this.state.starItemLength}
                          starList={this.state.starList}
                          pageNo= {this.state.pageNo}/>
        </div>
    );
  }
});

module.exports = UserCenterApp;
