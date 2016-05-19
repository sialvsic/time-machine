'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var TVplayActions = require('../../actions/tvplay/tvplay-actions');
var TVplayStore = require('../../store/tvplay/tvplay-store');


var TVplay = React.createClass({

  mixins: [Reflux.connect(TVplayStore)],

  getInitialState: function () {
    //tvplayList : [{
    //   screenshotsPath: String,  //视频截图的文件
    //   title: String,          //视频标题
    //   description: String,    //视频描述
    // }]
    return {
      tvplayList: []
    }
  },

  componentWillMount: function () {
    TVplayActions.getTVplay();
  },


  render: function () {
    var tvplayList = this.state.tvplayList.length === 0 ? '' : (<VideoItem videoItems={this.state.tvplayList}/>);

    return (
        <div id="tvplay-div" className="container-fluid">
          <div className="tvplay-header">
            <p>电视剧&nbsp;&nbsp;&nbsp;</p>
            <a href="tvplaysmore.html">更多&gt;&gt;</a>
          </div>
          <div className="tvplay-line"></div>
          {tvplayList}
        </div>
    );
  }
});

module.exports = TVplay;
