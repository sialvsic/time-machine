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
      searchResults: []
    }
  },

  componentWillMount: function () {
    var searchContent = window.location.href.split('?q=');
    //去的地址栏的输入搜索内容进行检索,当然先需要进行一下解码
    SearchActions.searchResult(decodeURI(searchContent[1]));
  },


  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <SearchResult searchResults={this.state.searchResults}
                        searchContent={decodeURI(window.location.href.split('?q=')[1])}
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