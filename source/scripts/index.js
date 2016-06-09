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
var Educate = require('./components/educate/educate.component.js');
var New = require('./components/new/new.component.js');
var Music = require('./components/music/music.component.js');
var Technology = require('./components/technology/technology.component.js');
var School = require('./components/school/school.component.js');
var Original = require('./components/original/original.component.js');
var Other = require('./components/other/other.component.js');

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
          <Educate/>
          <New/>
          <Music/>
          <Technology/>
          <School/>
          <Original/>
          <Other/>
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
