'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');


var Vedio = React.createClass({
  componentWillMount: ()=> {
  },


  render: ()=> {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>

        </div>
    )
  }
});


ReactDOM.render(
    <Vedio/>
    ,
    document.getElementById('vedio-div')
);