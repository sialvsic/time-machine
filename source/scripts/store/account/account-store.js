'use strict';

var Reflux = require('reflux');
var page = require('page');
var AccountActions = require('../../actions/account/account-actions');
var request = require('superagent');
var errorHandler = require('../../../../middleware/error-handler');
var constant = require('../../../../mixin/constant');


var AccountStore = Reflux.createStore({
  listenables: [AccountActions],

  onLoadAccount: function () {
    request.get('/account')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
          if (err) {
            return;
          } else if (res.body.status === constant.httpCode.OK) {
            this.trigger({account: res.body.account, isLoged: true , isAdmin:res.body.isAdmin});
          } else {
            //TODO
            //page('register.html');
          }
        });
  },

  onLogout: function () {
    request.get('/logout')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
          page('index.html');
        });
  }
});

module.exports = AccountStore;
