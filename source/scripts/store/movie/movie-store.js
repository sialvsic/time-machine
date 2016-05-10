'use strict';

var Reflux = require('reflux');
var MovieActions = require('../../actions/movie/movie-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var MovieStore = Reflux.createStore({
  listenables: MovieActions,

  onGetMovies: function () {
    request.get('/movies')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, req) => {
            console.log(req.body);
          this.trigger({
            movieList: req.body
          });
        });
  }

});

module.exports = MovieStore;
