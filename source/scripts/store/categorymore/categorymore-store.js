'use strict';

var Reflux = require('reflux');
var MoviesmoreActions = require('../../actions/moviesmore/moviesmore-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');
var errorHandler = require('../../../../middleware/error-handler');


var MoviesMoreStore = Reflux.createStore({
  listenables: MoviesmoreActions,

  onGetMoviesMore: function (href) {
    var field = href.split('?page=');
    console.log(field)
    var page = field[1];
    console.log(page);

    request.get('/categorymore')
        .set('Content-Type', 'application/json')
        .query({
          page: page || 1
        })
        .use(errorHandler)
        .end((err, req) => {
          this.trigger({
            movieList: req.body
          });
        });
  }


  //onSearchResult: function (href) {
  //
  //  var field = href.split('&&')[0];
  //  var q = decodeURI(field.split('?q=')[1]);
  //  var page = href.split('page=')[1];
  //
  //  var url = '/search';
  //  request.get(url)
  //      .set('Content-Type', 'application/json')
  //      .query({
  //        content: q,
  //        page: page || 1
  //
  //      })
  //      .use(errorHandler)
  //      .end((err, req)=> {
  //
  //        this.trigger({
  //          searchResults: req.body.doc,
  //          itemLenght: req.body.allDatalength
  //        })
  //      });
  //}

});

module.exports = MoviesMoreStore;
