'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var MusicActions = require('../../actions/music/music-actions');
var MusicStore = require('../../store/music/music-store');

var Music = React.createClass({

  mixins: [Reflux.connect(MusicStore)],

  getInitialState: function () {
    return {
      musicList: []
    }
  },

  componentWillMount: function () {
    MusicActions.getMusics();
    console.log('getMusics');
  },


  render: function () {

    var musicList = this.state.musicList.length === 0 ? '' : (<VideoItem videoItems={this.state.musicList}/>);

    return (
        <div id="music-div" className="container-fluid">
          <div className="music-header">
            <p>音乐&nbsp;&nbsp;&nbsp;</p>
            <a href="musicsmore.html">更多&gt;&gt;</a>
          </div>
          <div className="music-line"></div>
          {musicList}
        </div>
    );
  }
});

module.exports = Music;
