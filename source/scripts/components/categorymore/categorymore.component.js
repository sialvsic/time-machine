'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Navigation = require('../../components/navigation/navigation.component');
var Account = require('../../components/account/account.component');

var CategoryMoreResult = require('../categorymore-result/categorymore-result.component');
var CategoryMoreActions = require('../../actions/categorymore/categorymore-actions');
var CategoryMoreStore = require('../../store/categorymore/categorymore-store');

var CategoryMore = React.createClass({

  mixins: [Reflux.connect(CategoryMoreStore)],

  getInitialState: function () {
    return {
      categoryMoreResults: [],
      itemLenght: 0,
      category:''
    }
  },

  componentWillMount: function () {
    CategoryMoreActions.getCategoryMore(window.location.href);
  },

  render: function () {
    return (
        <div>
          <Navigation>
            <Account/>
          </Navigation>
          <CategoryMoreResult categoryMoreResults={this.state.categoryMoreResults}
                              itemLenght={this.state.itemLenght}
                              category={this.state.category}
          />
        </div>
    )
  }
});

module.exports = CategoryMore;
