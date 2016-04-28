'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');
var Videoplay = require('./components/video-play/video-play.component.js');
var Videofunc = require('./components/video-func/video-func.component.js');

var VideoActions = require('./actions/video/video-actions');
var VideoStore = require('./store/video/video-store');

var Video = React.createClass({

  mixins: [Reflux.connect(VideoStore)],

  getInitialState: function () {
    return {
      videoPlayInfo: {}
    }
  },

  componentWillMount: function () {
    var videoPath = window.location.href.split('#');
    VideoActions.getVideo(videoPath[1]);
  },


  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <Videoplay videoPlayInfo={this.state.videoPlayInfo}/>
          <Videofunc videoPlayInfo={this.state.videoPlayInfo}/>
        </div>
    )
  }
});


ReactDOM.render(
    <Video/>
    ,
    document.getElementById('video-div')
);