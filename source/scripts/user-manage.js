'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var $ = require('jquery');
var page = require('page');
var Navigation = require('./components/navigation/navigation.component');
var UserList = require('./components/user-manage/userlist.component');
var Account = require('./components/account/account.component');
var UserManageAction = require('./actions/user-manage/user-manage-actions');
var UserManageStore = require('./store/user-manage/user-manage-store');


$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content')
      .css('margin-top', '230px');
});

var UserManage = React.createClass({
  mixins: [Reflux.connect(UserManageStore)],

  getInitialState:function(){
    return {
      itemLength: 0,
      userList: []
    }
  },

  componentWillMount:function(){
    var href = window.location.href.split('user-manage.html')[1];
    if(!href){
      UserManageAction.getAllUserList();
    }else{
      var url = window.location.href;

      var type = url.split('&&key')[0];
      var typeValue = decodeURI(type.split('type=')[1]);
      var key = url.split('&&page')[0];
      var keyValue = decodeURI(key.split('key=')[1]);
      var pageValue = url.split('&&page=')[1];
      UserManageAction.getAllUserList(typeValue,keyValue,pageValue);

    }

  },

  findUserInfo: function(){
    var type =  this.refs.type.value;
    var key = this.refs.key.value;
    var english = ['name','gender','email','mobilePhone','school'];
    var chinese = ['姓名','性别','邮箱','电话','学校'];
    var index = chinese.indexOf(type);

    if(key==='男'){
      key='M';
    }
    if(key ==='女'){
      key='F';
    }

    var findUrl = 'user-manage.html'+ '?type=' + encodeURI(english[index]) + '&&key=' + encodeURI(key) + '&&page=1';
    page(findUrl);
  },

  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <div id="user-search">
            <div className="form-inline" >

              <div className="form-group">
               <label htmlFor="select-type">请选择要查询的类型： </label>
                <select className="form-control" id="select-type" ref='type'>
                    <option>姓名</option>
                    <option>性别</option>
                    <option>邮箱</option>
                    <option>电话</option>
                    <option>学校</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="search-input">请输入要查询的关键字： </label>
                <input type="text" className="form-control" ref="key" id="search-input" placeholder="支持模糊查询"/>
              </div>
                <button onClick={this.findUserInfo} className="btn btn-default">查询</button>
            </div>
          </div>
          <div>
             <h3>用户列表：</h3>
          </div>
          <UserList itemLength={this.state.itemLength}
                    userList={this.state.userList}/>
        </div>
    )
  }
});


ReactDOM.render(
    <UserManage/>
    ,
    document.getElementById('user-manage-div')
);
