'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var RegisterForm = require('./components/register-page/register-form.component');
var LoginForm = require('./components/register-page/login-form.component');
var LoginInfo = require('./components/register-page/login-info.component');
var RegisterAgreement = require('./components/register-page/register-agreement.component');
var RegisterPassword = require('./components/register-page/register-password.component');

var Register = React.createClass({
  componentWillMount: ()=> {
    window.onload = function () {
      $(".connect p").eq(0).animate({
        "left": "0%"
      }, 600);
      $(".connect p").eq(1).animate({
        "left": "0%"
      }, 400);
    }
  },


  render: ()=> {
    return (
        <div className="row">
          <RegisterForm>
            <RegisterPassword/>
          </RegisterForm>
          <LoginForm/>
          <LoginInfo/>
          <RegisterAgreement/>
        </div>
    )
  }
});

ReactDOM.render(
    <Register/>,
    document.getElementById('register-container')
);

var SIZE = 0.7;

$(function () {
  $('#agreementModal').on('show.bs.modal', function () {
    $('.modal .modal-body').css('overflow-y', 'auto').css('max-height', $(window).height() * SIZE);
  });
});
