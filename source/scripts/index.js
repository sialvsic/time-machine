'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Navigation = require('./components/navigation/navigation.component');
var Footer = require('./components/footer/footer.component');

var Scroll = require('./components/scroll/scroll.component');
var Slide = require('./components/slide/slide.component');
var Account = require('./components/account/account.component');
var Movie = require('./components/movie/movie.component.js');
var TVplay = require('./components/tvplay/tvplay.component.js');
var Anime = require('./components/anime/anime.component.js');
var Variety = require('./components/variety/variety.component.js');

var Index = React.createClass({
  componentWillMount: ()=> {
  },


  render: ()=> {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <Scroll/>
          <Slide/>
          <Movie/>
          <TVplay/>
          <Anime/>
          <Variety/>
          <Footer/>
        </div>
    )
  }
});


ReactDOM.render(
    <Index/>
    ,
    document.getElementById('index-page')
);
