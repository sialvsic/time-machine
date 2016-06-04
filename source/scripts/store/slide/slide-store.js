'use strict';

var Reflux = require('reflux');
var SlideActions = require('../../actions/slide/slide-actions');
var request = require('superagent');
var errorHandler = require('../../../../middleware/error-handler');

var SlideStore = Reflux.createStore({
  listenables: SlideActions,

  onGetPopVideo: function () {

    request.get('/video/pop/top')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {

          this.trigger({
            popList: req.body.popList,
            idList: req.body.idList

          });
        });
  }

});

module.exports = SlideStore;
