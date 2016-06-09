'use strict';

var Reflux = require('reflux');
var MusicActions = require('../../actions/music/music-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var MusicStore = Reflux.createStore({
  listenables: MusicActions,

  onGetMusics: function () {
    request.get('/musics')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            musicList: req.body
          });
        });
  }

});

module.exports = MusicStore;
