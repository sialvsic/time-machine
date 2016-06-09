'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var NewActions = require('../../actions/new/new-actions');
var NewStore = require('../../store/new/new-store');

var New = React.createClass({

  mixins: [Reflux.connect(NewStore)],

  getInitialState: function () {
    return {
      newList: []
    }
  },

  componentWillMount: function () {
    NewActions.getNews();
    console.log('getNews');
  },


  render: function () {

    var newList = this.state.newList.length === 0 ? '' : (<VideoItem videoItems={this.state.newList}/>);

    return (
        <div id="new-div" className="container-fluid">
          <div className="new-header">
            <p>新闻&nbsp;&nbsp;&nbsp;</p>
            <a href="newsmore.html">更多&gt;&gt;</a>
          </div>
          <div className="new-line"></div>
          {newList}
        </div>
    );
  }
});

module.exports = New;
