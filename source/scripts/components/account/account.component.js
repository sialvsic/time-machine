'use strict';
var React = require('react');
var Reflux = require('reflux');

var AccountActions = require('../../actions/account/account-actions');
var AccountStore = require('../../store/account/account-store');


function initDropDown() {
  $(function () {
    $('.item-has-children').children('a').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
  })
}

var Account = React.createClass({
  mixins: [Reflux.connect(AccountStore)],

  getInitialState: function () {
    return {
      isLoged: false,
      account: '',
      isAdmin: ''
    };
  },


  componentWillMount: function () {
    AccountActions.loadAccount();
  },

  componentDidMount: function () {
    initDropDown();
  },

  logout: function () {
    console.log('logout');
    AccountActions.logout();
  },

  render: function () {

    return (
        <div id="account-div">
          <div className={this.state.isLoged ? 'hide':''}>

            <ul className="nav navbar-nav ">
              <li><a href="register.html#login">登录</a></li>
              <li><a href="register.html#register">注册</a></li>
              <li><a href="upload.html"><i className="fa fa-cloud-upload" aria-hidden="true"/>上传</a></li>
            </ul>
          </div>

          <div className={this.state.isLoged ? 'wrapper-demo' : 'hide'}>

            <div id="cd-lateral-nav">
              <div className="cd-navigation">
                <div className="item-has-children">
                  <a className="username">{this.state.account}</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="user-center.html?mark=userDetail">个人中心
                        <i className="fa fa-modx" aria-hidden="true"/>
                      </a>
                    </li>

                    <li className={this.state.isAdmin ? ' ': 'hide'}>
                      <a href="user-manage.html">用户管理
                        <i className="fa fa-users" aria-hidden="true"/>
                      </a>
                    </li>

                    <li className={this.state.isAdmin ? ' ': 'hide'}>
                      <a href="video-manage.html">视频管理
                        <i className="fa fa-video-camera" aria-hidden="true"/>
                      </a>
                    </li>

                    <li className="last-li" onClick={this.logout}>
                      <a href="javascript:void(0)">退出
                        <i className="fa fa-sign-out" aria-hidden="true"/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="upload-div">
              <ul className="">
                <li><a href="upload.html"><i className="fa fa-cloud-upload" aria-hidden="true"/>上传</a></li>
              </ul>
            </div>

          </div>
        </div>

    );
  }
});

module.exports = Account;
