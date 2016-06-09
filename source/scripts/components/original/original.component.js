'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var OriginalActions = require('../../actions/original/original-actions');
var OriginalStore = require('../../store/original/original-store');

var Original = React.createClass({

  mixins: [Reflux.connect(OriginalStore)],

  getInitialState: function () {
    return {
      originalList: []
    }
  },

  componentWillMount: function () {
    OriginalActions.getOriginals();
    console.log('getOriginals');
  },


  render: function () {

    var originalList = this.state.originalList.length === 0 ? '' : (<VideoItem videoItems={this.state.originalList}/>);

    return (
        <div id="original-div" className="container-fluid">
          <div className="original-header">
            <p>原创&nbsp;&nbsp;&nbsp;</p>
            <a href="originalsmore.html">更多&gt;&gt;</a>
          </div>
          <div className="original-line"></div>
          {originalList}
        </div>
    );
  }
});

module.exports = Original;
