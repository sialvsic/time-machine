'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var OtherActions = require('../../actions/other/other-actions');
var OtherStore = require('../../store/other/other-store');

var Other = React.createClass({

  mixins: [Reflux.connect(OtherStore)],

  getInitialState: function () {
    return {
      otherList: []
    }
  },

  componentWillMount: function () {
    OtherActions.getOthers();
    console.log('getOthers');
  },


  render: function () {

    var otherList = this.state.otherList.length === 0 ? '' : (<VideoItem videoItems={this.state.otherList}/>);

    return (
        <div id="other-div" className="container-fluid">
          <div className="other-header">
            <p>其他&nbsp;&nbsp;&nbsp;</p>
            <a href="othersmore.html">更多&gt;&gt;</a>
          </div>
          <div className="other-line"></div>
          {otherList}
        </div>
    );
  }
});

module.exports = Other;
