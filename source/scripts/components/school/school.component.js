'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var SchoolActions = require('../../actions/school/school-actions');
var SchoolStore = require('../../store/school/school-store');

var school = React.createClass({

  mixins: [Reflux.connect(SchoolStore)],

  getInitialState: function () {
    return {
      schoolList: []
    }
  },

  componentWillMount: function () {
    SchoolActions.getSchools();
    console.log('getSchools');
  },


  render: function () {

    var schoolList = this.state.schoolList.length === 0 ? '' : (<VideoItem videoItems={this.state.schoolList}/>);

    return (
        <div id="school-div" className="container-fluid">
          <div className="school-header">
            <p>校园&nbsp;&nbsp;&nbsp;</p>
            <a href="schoolsmore.html">更多&gt;&gt;</a>
          </div>
          <div className="school-line"></div>
          {schoolList}
        </div>
    );
  }
});

module.exports = school;
