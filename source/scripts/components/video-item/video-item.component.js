'use strict';
var React = require('react');
var Reflux = require('reflux');

//var vedioItem = require('../video-play-item/video-play-item');
//var MovieActions = require('../../actions/movie/movie-actions');
//var MovieStore = require('../../store/movie/movie-store');


var VedioItem = React.createClass({

  //mixins: [Reflux.connect(MovieStore)],

  componentWillMount: function () {
  },

  render: function () {
    var vedioItems = this.props.vedioItems;
    var views;

    if (vedioItems.length !== 0) {
      views = vedioItems.map((vedioItems, index)=> {
        var vedioHref = 'video.html?' + vedioItems._id;
        return (
            <div key={index} className="col-md-2">
              <div id="vedio-item">
                <a className="vedio-item-img" href={vedioHref}>
                  <img src={vedioItems.screenshotsPath}
                       alt=""/>
                  <p className="vedio-item-title">
                    {vedioItems.title}
                  </p>
                  <p className="vedio-item-description">
                    {vedioItems.description}
                  </p>
                </a>
              </div>
            </div>)
      })
    }

    return (
        <div id="vedio-item-div">
          {views}
        </div>
    );
  }
});

module.exports = VedioItem;
