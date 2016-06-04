'use strict';
var React = require('react');
var Reflux = require('reflux');
var SlideActions = require('../../actions/slide/slide-actions');
var SlideStore = require('../../store/slide/slide-store');
var page = require('page');

function initSlide(arr) {
  // var arr = ["01.jpg", "02.jpg", "03.jpg"];

  //$().attr(“属性名”,”new attr value”);
  //style="background-image:url('img/03.jpg')"
  //style="background-image:url('img/01.jgp)"

  jQuery(function ($) {
    $('[data-slidizle]').slidizle({});

    arr.forEach((item, index)=> {
      var id = '#picture' + ++index;
      var attr = "background-image:url('" + item.replace("'","\\\'") + "')";
      $(id).attr('style', attr);
    })
  });
}


var Slide = React.createClass({
  mixins: [Reflux.connect(SlideStore)],
  getInitialState: function () {
    return {
      popList: [],
      idList: []
    }
  },

  componentWillMount: function (){
    SlideActions.getPopVideo();
  },

  componentDidUpdate: function(){

    var popList = this.state.popList;
    if(popList.length !== 0){
      initSlide(popList);
    }
  },

  playVideo: function(evt){
    evt.preventDefault();
    var index = evt.target.name;
    var id = this.state.idList[index];
    page('video.html?'+id);
  },

  render: function() {
    var popList = this.state.popList;

    if(popList.length !== 0){
      var list = popList.map((item,index)=>{
        return (
          <li key={index + 1} data-slidizle-slide-id={"slide" + (index + 1)} className="slider-item">
            <img src={"" + item} name={index} onClick={this.playVideo} alt="首页图片"/>
          </li>
        )
      });

      var picture = popList.map((item,index)=>{
        return (
          <li key={index + 10 } id={"picture" + (index + 1)} className="slider-navigation-item" data-slidizle-slide-id={"slide" + (index + 1)}>
          </li>
        )
      });


    }

    return (
        <div id="slide">
          <section className="sample" data-slidizle>

            <ul className="slider-content" data-slidizle-content>
              {list}
            </ul>

            <header>
              <h2>时光机，回忆美好点滴</h2>
            </header>


            <div className="slider-next" data-slidizle-next>
              <i className="fa fa-arrow-right"/>
            </div>
            <div className="slider-previous" data-slidizle-previous>
              <i className="fa fa-arrow-left"/>
            </div>

            <ul className="slider-navigation" data-slidizle-navigation>
               {picture}
            </ul>

          </section>
        </div>
    )
  }
});

module.exports = Slide;



// <ul className="slider-content" data-slidizle-content>
//   <li data-slidizle-slide-id="slide1" className="slider-item">
//     <img src="img/01.jpg" alt=""/>
//   </li>
//   <li data-slidizle-slide-id="slide2" className="slider-item">
//     <img src="img/02.jpg" alt=""/>
//   </li>
//   <li data-slidizle-slide-id="slide3" className="slider-item">
//     <img src="img/03.jpg" alt=""/>
//   </li>
// </ul>



// <ul className="slider-navigation" data-slidizle-navigation>
//   <li id="picture1" className="slider-navigation-item" data-slidizle-slide-id="slide1">
//   </li>
//   <li id="picture2" className="slider-navigation-item" data-slidizle-slide-id="slide2">
//   </li>
//   <li id="picture3" className="slider-navigation-item" data-slidizle-slide-id="slide3">
//   </li>
// </ul>
