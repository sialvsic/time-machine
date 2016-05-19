'use strict';
var React = require('react');

function initSlide() {
  var arr = ["01.jpg", "02.jpg", "03.jpg"];

  //$().attr(“属性名”,”new attr value”);
  //style="background-image:url('img/03.jpg')"
  //style="background-image:url('img/01.jgp)"

  jQuery(function ($) {
    $('[data-slidizle]').slidizle({});

    arr.forEach((item, index)=> {
      var id = '#picture' + ++index;
      var attr = "background-image:url('img/" + item + "')";
      $(id).attr('style', attr);
    })
  });
}


var Slide = React.createClass({
  componentWillMount: function (){
    initSlide();
  },

  render: function() {
    return (
        <div id="slide">
          <section className="sample" data-slidizle>

            <ul className="slider-content" data-slidizle-content>
              <li data-slidizle-slide-id="slide1" className="slider-item">
                <img src="img/01.jpg" alt=""/>
              </li>
              <li data-slidizle-slide-id="slide2" className="slider-item">
                <img src="img/02.jpg" alt=""/>
              </li>
              <li data-slidizle-slide-id="slide3" className="slider-item">
                <img src="img/03.jpg" alt=""/>
              </li>

            </ul>
            <header>
              <h2>Custom Navigation (custom order)</h2>
              <h3>I have a custom navigation with image thumbs in a custom order. This is done by using the <strong>data-slidizle-slide-id</strong>
                attribute on slide and navigation items</h3>
            </header>


            <div className="slider-next" data-slidizle-next>
              <i className="fa fa-arrow-right"/>
            </div>
            <div className="slider-previous" data-slidizle-previous>
              <i className="fa fa-arrow-left"/>
            </div>

            <ul className="slider-navigation" data-slidizle-navigation>
              <li id="picture1" className="slider-navigation-item" data-slidizle-slide-id="slide1">
              </li>
              <li id="picture2" className="slider-navigation-item" data-slidizle-slide-id="slide2">
              </li>
              <li id="picture3" className="slider-navigation-item" data-slidizle-slide-id="slide3">
              </li>
            </ul>

          </section>
        </div>
    )
  }
});

module.exports = Slide;
