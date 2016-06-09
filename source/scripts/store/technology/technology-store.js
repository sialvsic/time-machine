'use strict';

var Reflux = require('reflux');
var TechnologyActions = require('../../actions/technology/technology-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var TechnologyStore = Reflux.createStore({
  listenables: TechnologyActions,

  onGetTechnology: function () {
    request.get('/technologys')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            technologyList: req.body
          });
        });
  }

});

module.exports = TechnologyStore;
