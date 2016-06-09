'use strict';

var Reflux = require('reflux');
var OriginalActions = require('../../actions/original/original-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');

var OriginalStore = Reflux.createStore({
  listenables: OriginalActions,

  onGetOriginals: function () {
    request.get('/originals')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            originalList: req.body
          });
        });
  }

});

module.exports = OriginalStore;
