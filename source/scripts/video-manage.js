'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var $ = require('jquery');
var page = require('page');
var Navigation = require('./components/navigation/navigation.component');
var VideoList = require('./components/video-manage/videolist.component');
var Account = require('./components/account/account.component');
var VideoManageAction = require('./actions/video-manage/video-manage-actions');
var VideoManageStore = require('./store/video-manage/video-manage-store');


$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content')
      .css('margin-top', '230px');
});

var VideoManage = React.createClass({
  mixins: [Reflux.connect(VideoManageStore)],

  getInitialState:function(){
    return {
      itemLength: 0,
      videoList: []
    }
  },

  componentWillMount:function(){
    var href = window.location.href.split('video-manage.html')[1];
    if(!href){
      VideoManageAction.getAllVideoList();
    }else{
      var url = window.location.href;

      var type = url.split('&&key')[0];
      var typeValue = decodeURI(type.split('type=')[1]);
      var key = url.split('&&page')[0];
      var keyValue = decodeURI(key.split('key=')[1]);
      var pageValue = url.split('&&page=')[1];
      VideoManageAction.getAllVideoList(typeValue,keyValue,pageValue);

    }

  },

  findVideoInfo: function(){
    var type =  this.refs.type.value;
    var key = this.refs.key.value;
    var english = ['title','extension','category','label'];
    var chinese = ['名称','扩展类型','分类','标签'];
    var index = chinese.indexOf(type);

    var findUrl = 'video-manage.html'+ '?type=' + encodeURI(english[index]) + '&&key=' + encodeURI(key) + '&&page=1';
    page(findUrl);
  },

  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>

          <div id="video-search">
            <div className="form-inline" >

              <div className="form-group">
               <label htmlFor="select-type">请选择要查询的类型： </label>
                <select className="form-control" id="select-type" ref='type'>
                    <option>名称</option>
                    <option>类型</option>
                    <option>分类</option>
                    <option>标签</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="search-input">请输入要查询的关键字： </label>
                <input type="text" className="form-control" ref="key" id="search-input" placeholder="支持模糊查询"/>
              </div>
                <button onClick={this.findVideoInfo} className="btn btn-default">查询</button>
            </div>
          </div>
          <div className="check-video-list">
             <a href="check-video.html"></a>
          </div>
          <div>
             <h4>视频列表：</h4>
          </div>
          <VideoList itemLength={this.state.itemLength}
                    videoList={this.state.videoList}/>
        </div>
    )
  }
});


ReactDOM.render(
    <VideoManage/>
    ,
    document.getElementById('video-manage-div')
);
