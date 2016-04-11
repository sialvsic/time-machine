'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Navigation = require('./components/navigation/navigation.component');
var Scroll = require('./components/scroll/scroll.component');
var Slide = require('./components/slide/slide.component');

ReactDOM.render(
    <div>
      <Navigation/>
      <Scroll/>
      <Slide/>
    </div>,
    document.getElementById('index-page')
);