'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoPlayActions = require('../../actions/videoplay/videoplay-actions');
var VideoPlayStore = require('../../store/videoplay/videoplay-store');

function isEmptyObject(Object) {
  for (var key in Object) {
    return false;
  }
  return true;
}


var VideoPlay = React.createClass({

  mixins: [Reflux.connect(VideoPlayStore)],

  getInitialState: function () {
    return {
      videoPlayInfo: {}
    }
  },

  componentWillMount: function () {
    var videoPath = window.location.href.split('#');
    VideoPlayActions.getVideo(videoPath[1]);
  },


  render: function () {

    var source = isEmptyObject(this.state.videoPlayInfo) ? '' : (
        <source src={this.state.videoPlayInfo.path.replace('public/','')}
                type={this.state.videoPlayInfo.mimetype}/>
    );


    return (
        <div id="videoplay-div">
          <div>
            <video id="my-video" className="video-js vjs-big-play-centered" controls
                   data-setup='{ "playbackRates": [1, 1.5, 2] ,"autoplay": true, "preload": "auto"}'>
              {source}
            </video>

          </div>
        </div>
    )
  }
});

module.exports = VideoPlay;