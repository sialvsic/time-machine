'use strict';

var React = require('react');
var RegisterApp = React.createClass({
  componentWillMount: ()=> {
    window.onload = function () {
      $(".connect p").eq(0).animate({
        "left": "0%"
      }, 600);
      $(".connect p").eq(1).animate({
        "left": "0%"
      }, 400);
    }
  },
  render() {
    return (
        <div className="row">
          {this.props.children}
        </div>
    );
  }
});

module.exports = RegisterApp;
