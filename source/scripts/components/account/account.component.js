'use strict';
var React = require('react');

function DropDown(el) {
  this.dd = el;
  this.placeholder = this.dd.children('span');
  this.opts = this.dd.find('ul.dropdown > li');
  this.val = '';
  this.index = -1;
  this.initEvents();
}

DropDown.prototype = {
  initEvents: function () {
    var obj = this;

    obj.dd.on('click', function (event) {
      $(this).toggleClass('active');
      return false;
    });

    obj.opts.on('click', function () {
      var opt = $(this);
      obj.val = opt.text();
      obj.index = opt.index();
      obj.placeholder.text(obj.val);
    });
  },
  getValue: function () {
    return this.val;
  },
  getIndex: function () {
    return this.index;
  }
};

$(function () {
  var dd = new DropDown($('#dd'));
  $(document).click(function () {
    $('.wrapper-dropdown-3').removeClass('active');
  });

});

var Account = React.createClass({

  getInitialState: function () {
    return {
      isLoged: false,
      account: ''
    };
  },

  componentWillMount: ()=> {

  },

  render: function () {


    return (
        <div>
          <ul className="nav navbar-nav ">
            <li><a href="#">登录</a></li>
            <li><a href="register.html">注册</a></li>
            <li><a href="#">上传</a></li>
          </ul>
        </div>
    );
  }
});

module.exports = Account;
