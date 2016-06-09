'use strict';

var Reflux = require('reflux');
var NewActions = require('../../actions/new/new-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var NewStore = Reflux.createStore({
  listenables: NewActions,

  onGetNews: function () {
    request.get('/news')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            newList: req.body
          });
        });
  }

});

module.exports = NewStore;
