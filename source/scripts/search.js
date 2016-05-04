'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');

var SearchResult = require('./components/search-result/search-result.component.js');
var SearchActions = require('./actions/search/search-actions');
var SearchStore = require('./store/search/search-store');

var Search = React.createClass({

  mixins: [Reflux.connect(SearchStore)],

  getInitialState: function () {
    return {
      searchResults: [],
      itemLenght: 0
    }
  },

  componentWillMount: function () {
    SearchActions.searchResult(window.location.href);
  },


  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <SearchResult searchResults={this.state.searchResults}
                        itemLenght={this.state.itemLenght}
          />
        </div>
    )
  }
});


ReactDOM.render(
    <Search/>
    ,
    document.getElementById('search-div')
);