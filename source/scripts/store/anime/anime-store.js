'use strict';

var Reflux = require('reflux');
var AnimeActions = require('../../actions/anime/anime-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var AnimeStore = Reflux.createStore({
  listenables: AnimeActions,

  onGetAnimes: function () {
    request.get('/animes')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            animeList: req.body
          });
        });
  }

});

module.exports = AnimeStore;
