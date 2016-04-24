'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');
var Videoplay = require('./components/video-play/video-play.component.js');


var Video = React.createClass({

  render: ()=> {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <Videoplay/>
        </div>
    )
  }
});


ReactDOM.render(
    <Video/>
    ,
    document.getElementById('video-div')
);