'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var VideoActions = require('../../actions/video/video-actions');


var VideoStore = Reflux.createStore({
  listenables: VideoActions,

  onGetVideo: function (videoId) {

    var url = '/video/' + videoId;
    request.get(url)
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req)=> {
          console.log(req.body);
          this.trigger({
            videoPlayInfo: req.body,
            thumbsupNumbers: req.body.thumbupNumber,
            thumbsupStatus: req.body.thumbsupStatus,
            starStatus: req.body.starStatus,
            playNumber: req.body.playNumber
          })
        });
  }

});

module.exports = VideoStore;
