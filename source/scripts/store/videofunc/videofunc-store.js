'use strict';

var Reflux = require('reflux');
var page = require('page');
var validate = require('validate.js');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var VideofuncActions = require('../../actions/videofunc/videofunc-actions');

var VedioplayStore = Reflux.createStore({
  listenables: VideofuncActions,

  onSetThumbsUpStatus: function (thumbsupStatus, videoId) {

    var url = '/video/' + videoId + '/thumbsupStatus';
    var data = {
      thumbsupStatus: thumbsupStatus
    };

    request.put(url)
        .set('Content-Type', 'application/json')
        .send(data)
        .use(errorHandler)
        .end((err, req)=> {

          //this.trigger({videoPlayInfo: req.body})

        });
  },

  onSetStarStatus: function (starStatus, videoId) {

    var url = '/video/' + videoId + '/starStatus';
    var data = {
      starStatus: starStatus
    };

    request.put(url)
        .set('Content-Type', 'application/json')
        .send(data)
        .use(errorHandler)
        .end((err, req)=> {

          //this.trigger({videoPlayInfo: req.body})

        });
  }


});

module.exports = VedioplayStore;
