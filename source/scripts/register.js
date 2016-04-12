'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var RegisterApp = require('./components/register-page/register-app.component');
var RegisterForm = require('./components/register-page/register-form.component');
var LoginForm = require('./components/register-page/login-form.component');
var LoginInfo = require('./components/register-page/login-info.component');
var RegisterAgreement = require('./components/register-page/register-agreement.component');
var RegisterPassword = require('./components/register-page/register-password.component');

ReactDom.render(
    <RegisterApp>
      <RegisterForm>
        <RegisterPassword/>
      </RegisterForm>
      <LoginForm/>
      <LoginInfo/>
      <RegisterAgreement/>
    </RegisterApp>,
    document.getElementById('register-container')
);

var SIZE = 0.7;

$(function () {
  $('#agreementModal').on('show.bs.modal', function () {
    $('.modal .modal-body').css('overflow-y', 'auto').css('max-height', $(window).height() * SIZE);
  });
});
