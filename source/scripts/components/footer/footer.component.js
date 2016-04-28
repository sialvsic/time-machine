'use strict';
var React = require('react');
var $ = require('jquery');


function setMouseOver() {
  $(function () {
    $('.footer-intrduce ul li').hover(function () {
      $('span', this).stop().css('height', '2px');
      $('span', this).animate({
        left: '0',
        width: '100%',
        right: '0'
      }, 200);
    }, function () {
      $('span', this).stop().animate({
        left: '50%',
        width: '0'
      }, 200);
    });
  });
}
var Footer = React.createClass({

  componentWillMount: function () {
    setMouseOver();
  },

  render: function () {
    return (
        <div id="footer-div">

          <div className="footer-intrduce">
            <ul>
              <div>
                <li><a href='#'>网站简介</a><span/></li>
              </div>
              <div>
                <li><a href='#'>联系方式</a><span/></li>
              </div>
              <div>
                <li><a href='#'>帮助与反馈</a><span/></li>
              </div>
              <div className="footer-intrduce-li-last">
                <li ><a href='#'>关于我</a><span/></li>
              </div>
            </ul>

            <p>Copyright © 2016 时光机 All Rights Reserved</p>

          </div>

        </div>
    );
  }
});

module.exports = Footer;

//<div className="footer-intrduce">
//  <ul>
//    <li><a href=""><span>网站简介</span></a></li>
//    <li><a href=""><span>联系方式</span></a></li>
//    <li><a href=""><span>帮助与反馈</span></a></li>
//    <li><a href=""><span className="footer-intrduce-li-last">关于我</span></a></li>
//  </ul>
//
//</div>