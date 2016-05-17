'use strict';
var React = require('react');

function isEmptyObject(Object) {
  for (var key in Object) {
    return false;
  }
  return true;
}


var VideoPlay = React.createClass({

  componentDidUpdate:function(){
    console.log('i am in ');
    var container = document.getElementById("video-play");

     if(!isEmptyObject(this.props.videoPlayInfo)){
       var src = this.props.videoPlayInfo.path.replace('public/','');
       var type = this.props.videoPlayInfo.mimetype;

       flowplayer(container, {
          autoplay: true,
           clip: {
               sources: [
                     { type: type,
                       src:  src }
               ]
           }
       });
     }
    // install flowplayer into selected container

  },

  render: function () {



    return (
      <div id="videoplay-div">
         <div id="video-play">
         </div>

      </div>

    )
  }
});

module.exports = VideoPlay;

// var source = isEmptyObject(this.props.videoPlayInfo) ? '' : (
//
//     <source src={this.props.videoPlayInfo.path.replace('public/','')}
//           type={this.props.videoPlayInfo.mimetype}/>
//
//
// );
// <div className="flowplayer" data-ratio="0.6" >
//   <video>
//     {source}
//   </video>
// </div>

// var source = isEmptyObject(this.props.videoPlayInfo) ? '' : (
//     <source src={this.props.videoPlayInfo.path.replace('public/','')}
//             type={this.props.videoPlayInfo.mimetype}/>
// );
//
// <div id="videoplay-div">
//   <div>
//     <video id="my-video" className="video-js vjs-big-play-centered" controls
//            data-setup='{ "playbackRates": [1, 1.5, 2] ,"autoplay": true, "preload": "auto","techOrder": ["html5", "flash"]}'>
//       {source}
//     </video>
//   </div>
// </div>
