'use strict';
var React = require('react');
var Reflux = require('reflux');

var VedioItem = require('./vedio-item.component');
var VedioActions = require('../../actions/movie/movie-actions');
var VedioStore = require('../../store/movie/movie-store');


var Vedio = React.createClass({

  mixins: [Reflux.connect(VedioStore)],

  getInitialState: function () {
    return {
      vedioPath: ''
    }
  },

  componentWillMount: function () {
    var href = window.location.href;
    var vedioPath = href.split('#');
    console.log(vedioPath);
    VedioActions.getMovies();
  },


  render: function () {

    return (
        <div>
          <video id="my-video" className="video-js vjs-big-play-centered" controls preload="auto" width="200"
                 height="100"
                 poster="./screeshots/Part.6(K.will)%20-(Talk%20Love)%20MV%201080P.png" data-setup="{}">
            <source src="./vedio/Part.4%20(Gummy)%20-%20You%20Are%20My%20Everything%20MV%201080P.mp4" type='video/mp4'>
              <!--<source src="MY_VIDEO.webm" type='video/webm'>-->
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
              </p>
            </source>
          </video>
        </div>
    )
  }
});

module.exports = Vedio;
