'use strict';
var React = require('react');
var Reflux = require('reflux');

//var vedioItem = require('../video-play-item/video-play-item');
//var MovieActions = require('../../actions/movie/movie-actions');
//var MovieStore = require('../../store/movie/movie-store');


var VideoItem = React.createClass({

  //mixins: [Reflux.connect(MovieStore)],

  componentWillMount: function () {

  },

  render: function () {
    var videoItems = this.props.videoItems;
    var views;

    if (videoItems.length !== 0) {
      views = videoItems.map((videoItem, index)=> {
        var videoHref = 'video.html?' + videoItem._id;
        return (
            <div key={index} className="col-md-2">
              <div id="video-item">
                <a className="video-item-img" href={videoHref}>
                  <img src={videoItem.lowScreenshotsPath}
                       alt=""/>
                  <p className="video-item-title">
                    {videoItem.title}
                  </p>
                  <p className="video-item-description">
                    {videoItem.description}
                  </p>
                </a>
              </div>
            </div>)
      })
    }

    return (
        <div id="video-item-div">
          {views}
        </div>
    );
  }
});

module.exports = VideoItem;
