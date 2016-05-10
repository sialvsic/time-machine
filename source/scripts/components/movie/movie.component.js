'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var MovieActions = require('../../actions/movie/movie-actions');
var MovieStore = require('../../store/movie/movie-store');


var Movie = React.createClass({

  mixins: [Reflux.connect(MovieStore)],

  getInitialState: function () {
    //movieList : [{
    //   screenshotsPath: String,  //视频截图的文件
    //   title: String,          //视频标题
    //   description: String,    //视频描述
    // }]
    return {
      movieList: []
    }
  },

  componentWillMount: function () {
      console.log('1234');
    MovieActions.getMovies();
  },


  render: function () {

    var movieList = this.state.movieList.length === 0 ? '' : (<VideoItem vedioItems={this.state.movieList}/>);

    return (
        <div id="movie-div" className="container-fluid">
          <div className="movie-header">
            <p>电影&nbsp;&nbsp;&nbsp;</p>
            <a href="moviesmore.html">更多&gt;&gt;</a>
          </div>
          <div className="movie-line"></div>
          {movieList}
        </div>
    );
  }
});

module.exports = Movie;
