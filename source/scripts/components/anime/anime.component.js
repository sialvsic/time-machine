'use strict';
var React = require('react');
var Reflux = require('reflux');

var VideoItem = require('../video-item/video-item.component');
var AnimeActions = require('../../actions/anime/anime-actions');
var AnimeStore = require('../../store/anime/anime-store');

var Anime = React.createClass({

  mixins: [Reflux.connect(AnimeStore)],

  getInitialState: function () {
    //movieList : [{
    //   screenshotsPath: String,  //视频截图的文件
    //   title: String,          //视频标题
    //   description: String,    //视频描述
    // }]
    return {
      animeList: []
    }
  },

  componentWillMount: function () {
    AnimeActions.getAnimes();
  },


  render: function () {

    var animeList = this.state.animeList.length === 0 ? '' : (<VideoItem videoItems={this.state.animeList}/>);

    return (
        <div id="anime-div" className="container-fluid">
          <div className="anime-header">
            <p>动漫&nbsp;&nbsp;&nbsp;</p>
            <a href="animesmore.html">更多&gt;&gt;</a>
          </div>
          <div className="anime-line"></div>
          {animeList}
        </div>
    );
  }
});

module.exports = Anime;
