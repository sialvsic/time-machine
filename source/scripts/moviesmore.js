'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');

var MovieMoreResult = require('./components/moviesmore-result/moviesmore-result.component.js');
var MovieMoreActions = require('./actions/moviesmore/moviesmore-actions');
var MovieMoreStore = require('./store/moviesmore/moviesmore-store');

var MovieMore = React.createClass({

  mixins: [Reflux.connect(MovieMoreStore)],

  getInitialState: function () {
    return {
      MovieMoreResults: [],
      itemLenght: 0
    }
  },

  componentWillMount: function () {
    //MovieMoreActions.getMoviesMore(window.location.href);
  },


  render: function () {
    return (
        <div>
          <Navigation>
            <Account/>
          </Navigation>

        </div>
    )
  }
});


ReactDOM.render(
    <MovieMore/>
    ,
    document.getElementById('movie-div')
);

//
//<MovieMoreResult searchResults={this.state.searchResults}
//                 itemLenght={this.state.itemLenght}
///>