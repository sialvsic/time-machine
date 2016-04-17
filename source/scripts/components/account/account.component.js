'use strict';
var React = require('react');
var Reflux = require('reflux');

var AccountActions = require('../../actions/account/account-actions');
var AccountStore = require('../../store/account/account-store');

function DropDown(el) {
  this.dd = el;
  this.placeholder = this.dd.children('span');
  this.opts = this.dd.find('ul.dropdown > li');
  this.val = '';
  this.index = -1;
  this.initEvents();
}

DropDown.prototype = {
  initEvents: function () {
    var obj = this;
    obj.dd.on('click', function (event) {

      $(this).toggleClass('active');
      return false;
    });

  },
  getIndex: function () {
    return this.index;
  }
};

function initDropDown() {
  $(function () {
    var dd = new DropDown($('#dd'));
    $('.account').click(function () {
      $('.wrapper-dropdown-3').removeClass('active');
    });
  });
}
var Account = React.createClass({
  mixins: [Reflux.connect(AccountStore)],

  getInitialState: function () {
    return {
      isLoged: false,
      account: ''

    };
  },

  componentDidMount: ()=> {
    initDropDown();
  },

  componentWillMount: ()=> {
    AccountActions.loadAccount();
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
            <div id="dd" className="nav navbar-nav wrapper-dropdown" tabIndex="1">
              <span>{this.state.account}</span>
              <i id="dire" className="fa fa-sort-desc" aria-hidden="true"/>
              <ul className="dropdown account">
                <li><a href="#">个人中心<i className="fa fa-modx"/></a></li>
                <li><a href="#">退出<i className="fa fa-sign-out"/></a></li>
              </ul>


            </div>
            <div>
              <ul className="nav navbar-nav ">
                <li><a href="upload.html"><i className="fa fa-cloud-upload" aria-hidden="true"/>上传</a></li>
              </ul>
            </div>
          </div>
        </div>

    );
  }
});

module.exports = Account;
