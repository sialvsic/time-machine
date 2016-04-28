'use strict';
var React = require('react');

function isEmptyObject(Object) {
  for (var key in Object) {
    return false;
  }
  return true;
}


var VideoPlay = React.createClass({

  render: function () {

    var source = isEmptyObject(this.props.videoPlayInfo) ? '' : (
        <source src={this.props.videoPlayInfo.path.replace('public/','')}
                type={this.props.videoPlayInfo.mimetype}/>
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