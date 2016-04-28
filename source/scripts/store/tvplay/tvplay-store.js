'use strict';

var Reflux = require('reflux');
var TVplayActions = require('../../actions/tvplay/tvplay-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var TVplayStore = Reflux.createStore({
  listenables: TVplayActions,

  onGetTVplay: function () {
    request.get('/tvplays')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {

          this.trigger({
            tvplayList: req.body
          });
        });
  }

});

module.exports = TVplayStore;
