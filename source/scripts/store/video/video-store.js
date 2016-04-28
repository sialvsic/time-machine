'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var VideoActions = require('../../actions/video/video-actions');


var VedioStore = Reflux.createStore({
  listenables: VideoActions,

  onGetVideo: function (videoId) {

    var url = '/video/' + videoId;
    request.get(url)
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req)=> {
          this.trigger({videoPlayInfo: req.body})
        });
  }

});

module.exports = VedioStore;
