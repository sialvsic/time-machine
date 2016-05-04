'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var SearchActions = require('../../actions/search/search-actions');


var SearchStore = Reflux.createStore({
  listenables: SearchActions,

  onSearchResult: function (href) {

    var field = href.split('&&')[0];
    var q = decodeURI(field.split('?q=')[1]);
    var page = href.split('page=')[1];

    var url = '/search';
    request.get(url)
        .set('Content-Type', 'application/json')
        .query({
          content: q,
          page: page || 1

        })
        .use(errorHandler)
        .end((err, req)=> {

          this.trigger({
            searchResults: req.body.doc,
            itemLenght: req.body.allDatalength
          })
        });
  }

});

module.exports = SearchStore;
