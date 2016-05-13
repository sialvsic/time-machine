'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var $ = require('jquery');
var page = require('page');
var Navigation = require('./components/navigation/navigation.component');
var CheckVideoList = require('./components/check-video/checkvideolist.component');
var Account = require('./components/account/account.component');
var CheckVideoAction = require('./actions/check-video/check-video-actions');
var CheckVideoStore = require('./store/check-video/check-video-store');


$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content')
      .css('margin-top', '230px');
});

var CheckVideo = React.createClass({
  mixins: [Reflux.connect(CheckVideoStore)],

  getInitialState:function(){
    return {
      itemLength: 0,
      checkvideoList: []
    }
  },

  componentWillMount:function(){

    var href = window.location.href.split('?page=')[1];
    var page = href ? href : '1';
    console.log('current page is :');
    console.log(page);
    CheckVideoAction.getAllCheckVideoList(page);
  },

  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>

          <div className="return-video-list">
             <a className="btn" href="video-manage.html">返回</a>
          </div>
          <div>
             <h4>待审核视频列表：</h4>
          </div>
          <CheckVideoList itemLength={this.state.itemLength}
                    checkvideoList={this.state.checkvideoList}/>
        </div>
    )
  }
});


ReactDOM.render(
    <CheckVideo/>
    ,
    document.getElementById('check-video-div')
);
