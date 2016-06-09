'use strict';

var Reflux = require('reflux');
var VarietyActions = require('../../actions/variety/variety-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var VarietyStore = Reflux.createStore({
  listenables: VarietyActions,

  onGetVarieties: function () {
    request.get('/varieties')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            varietyList: req.body
          });
        });
  }

});

module.exports = VarietyStore;
