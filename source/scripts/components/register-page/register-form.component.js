'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var validate = require('validate.js');
var constraint = require('../../../../mixin/register-constraint');
var constant = require('../../../../mixin/constant');
var async = require('async');
var RegisterActions = require('../../actions/register-page/register-actions');
var RegisterStore = require('../../store/register-page/register-store');
var LoginStore = require('../../store/register-page/login-store');

var asyncContainersFunc = {
  email: function (value, done) {
    RegisterActions.checkEmail(value, done);
  },
  mobilePhone: function (value, done) {
    RegisterActions.checkMobilePhone(value, done);
  }
};

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return '';
}


var RegisterForm = React.createClass({
  mixins: [Reflux.connect(RegisterStore), Reflux.connect(LoginStore)],

  getInitialState: function () {
    return {
      isLoginState: false,
      mobilePhoneError: '',
      emailError: '',
      agree: false,
      clickable: false,
      password: ''
    };
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (!this.state.isLoginState && prevState.isLoginState) {
      this.setState({
        mobilePhoneError: '',
        emailError: ''
      });
      this.refs.mobilePhone.value = '';
      this.refs.email.value = '';
    }
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value.trim();
    var name = target.name;    //name  属性 mobilePhone  或者 email
    var valObj = {};
    valObj[name] = value;

    var result = validate(valObj, constraint);     //Object {email: Array[1], mobilePhone: Array[1], password: Array[1]}
    var error = getError(result, name);
    var stateObj = {};
    stateObj[name + 'Error'] = error;

    this.setState(stateObj);

    if ('' === error && name !== 'password') {
      asyncContainersFunc[name](value, (stateObj) => {
        this.setState(stateObj);
      });
    }
  },

  changeAgreeState: function () {
    var newState = !this.state.agree;
    this.setState({agree: newState});
  },

  checkRegisterData: function (registerInfo) {
    var passCheck = true;

    if (this.state.agree === false) {
      $('#agree-check').modal('show');
      passCheck = false;
    }

    var stateObj = {};
    registerInfo.forEach((item, i) => {
      var valObj = {};

      var value = item.value.trim();
      var name = item.name;

      valObj[name] = value;
      var result = validate(valObj, constraint);

      var error = getError(result, name);
      if (error !== '') {
        passCheck = false;
      }
      stateObj[name + 'Error'] = error;
    });
    RegisterActions.checkData(stateObj);
    return passCheck;
  },

  register: function (evt) {
    evt.preventDefault();

    if (this.state.mobilePhoneError !== '' || this.state.emailError !== '') {
      return false;
    }
    var registerData = [];
    var mobilePhone = ReactDOM.findDOMNode(this.refs.mobilePhone);
    var email = ReactDOM.findDOMNode(this.refs.email);
    var password = {
      name: 'password',
      value: this.state.password
    };

    registerData.push(mobilePhone, email, password);

    if (!this.checkRegisterData(registerData)) {
      return false;
    } else {
      this.setState({
        clickable: true
      });
      RegisterActions.register(mobilePhone.value.trim(), email.value.trim(), password.value.trim());
    }
  },

  render: function () {
    var classString = 'col-md-7 logon-form-container' + (this.state.isLoginState ? ' hide' : '');

    return (
        <div id="register" className={classString}>
          <h4 className="welcome">欢迎注册时光机</h4>

          <form action='user-center.html' onSubmit={this.register}>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入手机号" name="mobilePhone" ref="mobilePhone"
                     onBlur={this.validate}/>

              <div
                  className={'lose' + (this.state.mobilePhoneError === '' ? ' hide' : '')}>{this.state.mobilePhoneError}</div>
            </div>

            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入邮箱" name="email" ref="email"
                     onBlur={this.validate}/>

              <div
                  className={'lose' + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}</div>
            </div>

            <div className="form-group">
              {this.props.children}
            </div>

            <div className="checkbox">
              <label>
                <input type="checkbox" className="agree-check" onClick={this.changeAgreeState}/> 同意
              </label>
              <a id="agreement" data-toggle="modal" data-target="#registerAgreement">注册协议</a>
              <span>和</span>
              <a id="agreement" data-toggle="modal" data-target="#securityAgreement">保密协议</a>
            </div>

            <button type="submit" id="register-btn" ref="register"
                    className="button button-glow button-rounded button-caution">注册
              <i className={'fa fa-spinner fa-spin' + (this.state.clickable ? '' : ' hide')}/>
            </button>
          </form>
        </div>
    );
  }
});

module.exports = RegisterForm;
