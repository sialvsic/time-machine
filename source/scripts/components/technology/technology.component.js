'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var TechnologyActions = require('../../actions/technology/technology-actions');
var TechnologyStore = require('../../store/technology/technology-store');

var Technology = React.createClass({

  mixins: [Reflux.connect(TechnologyStore)],

  getInitialState: function () {
    return {
      technologyList: []
    }
  },

  componentWillMount: function () {
    TechnologyActions.getTechnology();
    console.log('getTechnology');
  },


  render: function () {

    var technologyList = this.state.technologyList.length === 0 ? '' : (<VideoItem videoItems={this.state.technologyList}/>);

    return (
        <div id="technology-div" className="container-fluid">
          <div className="technology-header">
            <p>科技&nbsp;&nbsp;&nbsp;</p>
            <a href="technologysmore.html">更多&gt;&gt;</a>
          </div>
          <div className="technology-line"></div>
          {technologyList}
        </div>
    );
  }
});

module.exports = Technology;
