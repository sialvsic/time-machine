'use strict';

var React = require('react');
var ReactDOM = require('react-dom');


var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');
var UserCenterApp = require('./components/user-center/user-center-app.component');


ReactDOM.render(
    <div>
      <Navigation>
        <Account />
      </Navigation>
      <UserCenterApp/>
    </div>,
    document.getElementById('user-center-div')
);
