'use strict';

var Reflux = require('reflux');
var VideoplayActions = require('../../actions/videoplay/videoplay-actions');
var page = require('page');
var validate = require('validate.js');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var async = require('async');
var errorHandler = require('../../../../middleware/error-handler');


var VedioplayStore = Reflux.createStore({
  listenables: VideoplayActions,

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

module.exports = VedioplayStore;
