'use strict';

var Reflux = require('reflux');
var SchoolActions = require('../../actions/school/school-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');

var SchoolStore = Reflux.createStore({
  listenables: SchoolActions,

  onGetSchools: function () {
    request.get('/schools')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            schoolList: req.body
          });
        });
  }

});

module.exports = SchoolStore;
