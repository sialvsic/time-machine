'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var SearchActions = require('../../actions/search/search-actions');


var SearchStore = Reflux.createStore({
  listenables: SearchActions,

  onSearchResult: function (searchContent) {

    var url = '/search';
    request.get(url)
        .set('Content-Type', 'application/json')
        .query({
          content: searchContent
        })
        .use(errorHandler)
        .end((err, req)=> {

          this.trigger({
            searchResults: req.body
          })
        });
  }

});

module.exports = SearchStore;
