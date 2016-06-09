'use strict';

var Reflux = require('reflux');
var OtherActions = require('../../actions/other/other-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var OtherStore = Reflux.createStore({
  listenables: OtherActions,

  onGetOthers: function () {
    request.get('/others')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            otherList: req.body
          });
        });
  }

});

module.exports = OtherStore;
