'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var VarietyActions = require('../../actions/variety/variety-actions');
var VarietyStore = require('../../store/variety/variety-store');

var Variety = React.createClass({

  mixins: [Reflux.connect(VarietyStore)],

  getInitialState: function () {
    return {
      varietyList: []
    }
  },

  componentWillMount: function () {
    VarietyActions.getVarieties();
  },


  render: function () {

    var varietyList = this.state.varietyList.length === 0 ? '' : (<VideoItem videoItems={this.state.varietyList}/>);

    return (
        <div id="variety-div" className="container-fluid">
          <div className="variety-header">
            <p>综艺&nbsp;&nbsp;&nbsp;</p>
            <a href="varietiesmore.html">更多&gt;&gt;</a>
          </div>
          <div className="variety-line"></div>
          {varietyList}
        </div>
    );
  }
});

module.exports = Variety;
