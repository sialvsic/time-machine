'use strict';

var Reflux = require('reflux');
var EducateActions = require('../../actions/educate/educate-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var EducateStore = Reflux.createStore({
  listenables: EducateActions,

  onGetEducates: function () {
    request.get('/educates')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            educateList: req.body
          });
        });
  }

});

module.exports = EducateStore;
