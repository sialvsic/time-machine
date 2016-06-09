'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var EducateActions = require('../../actions/educate/educate-actions');
var EducateStore = require('../../store/educate/educate-store');

var Educate = React.createClass({

  mixins: [Reflux.connect(EducateStore)],

  getInitialState: function () {
    return {
      educateList: []
    }
  },

  componentWillMount: function () {
    EducateActions.getEducates();
    console.log('getEducates');
  },


  render: function () {

    var educateList = this.state.educateList.length === 0 ? '' : (<VideoItem videoItems={this.state.educateList}/>);

    return (
        <div id="educate-div" className="container-fluid">
          <div className="educate-header">
            <p>教育&nbsp;&nbsp;&nbsp;</p>
            <a href="educatesmore.html">更多&gt;&gt;</a>
          </div>
          <div className="educate-line"></div>
          {educateList}
        </div>
    );
  }
});

module.exports = Educate;
