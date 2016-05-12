'use strict';
var React = require('react');
var moment = require('moment');
var Reflux = require('reflux');
var constant = require('../../../../mixin/constant');
var UserManageAction = require('../../actions/user-manage/user-manage-actions');
var UserManageStore = require('../../store/user-manage/user-manage-store');
var page = require('page');

function getParameter(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


var UserList = React.createClass({
  mixins: [Reflux.connect(UserManageStore)],

  getInitialState:function(){
    return {
      school: '',
      name: '',
      mobilePhone: '',
      email: '',
      gender: 'M',
      major: '',
      degree: '',
      _id: ''
    }
  },

  componentDidUpdate: function () {

    var itemLength = this.props.itemLength;
    console.log(itemLength);
    //init
    if(itemLength!==0){
          jQuery(function () {
            var itemPerPage = constant.itemPerPage.user;
            var totalPage = Math.ceil(itemLength / itemPerPage);
            console.log(totalPage);

            var totalRecords = itemLength;
            var pageNo = getParameter('page');
            if (!pageNo) {
              pageNo = 1;
            }
            //生成分页
            //分页使用的是https://github.com/pgkk/kkpager
            //有些参数是可选的，比如lang，若不传有默认值
            kkpager.generPageHtml({
              pno: pageNo,
              //总页码
              total: totalPage,
              //总数据条数
              totalRecords: totalRecords,
              //链接前部
              hrefFormer: 'search',

              getLink: function (n) {

                var href = decodeURI(window.location.href.split('&&')[0]);
                var url = href.split('?q=')[1];

                return this.hrefFormer + "?q=" + url + "&&page=" + n;
              }
            });
          });
      }

  },

  showModel: function(evt){
    var id = evt.target.name;
    UserManageAction.getUserInfo(id);
    jQuery('#submitModal').modal('show');
  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;
    this.setState({[stateName]: newState});
  },

  updateInfo:function(evt){
    evt.preventDefault();

    var userData = {
      school: this.state.school,
      name: this.state.name,
      mobilePhone: this.state.mobilePhone,
      email: this.state.email,
      gender: this.state.gender,
      major: this.state.major,
      degree: this.state.degree,
      _id: this.state._id
    };

    UserManageAction.updateUserInfo(userData);
    jQuery('#submitModal').modal('hide');
    page('user-manage.html');
  },

  deleteInfo:function(evt){
    evt.preventDefault();
    var userId = evt.target.name;
    UserManageAction.deleteUserInfo(userId);

    jQuery(".edit button[name="+userId+"]").hide();
    jQuery(".delete button[name="+userId+"]").html('已删除');
  },

  render: function () {

    var userlistResults = this.props.userList;
    var result;
    if (userlistResults.length !== 0) {
      result = userlistResults.map((userItem, index)=> {
        return (
            <div key={index}>
              <div className="col-md-12 userItem-content" >
                <div className="row">
                  <div className="col-md-1">{userItem.name}</div>
                  <div className="col-md-1">{userItem.gender ==='M'? '男':'女'}</div>
                  <div className="col-md-2">{userItem.school}</div>
                  <div className="col-md-1">{userItem.major}</div>
                  <div className="col-md-1">{userItem.degree}</div>
                  <div className="col-md-2">{userItem.email}</div>
                  <div className="col-md-2">{userItem.mobilePhone}</div>
                  <div className="col-md-2">
                     <div className="edit operation">
                        <button name={userItem._id} onClick={this.showModel}>编辑</button>
                     </div>
                     <div className="delete operation">
                        <button name={userItem._id} onClick={this.deleteInfo}>删除</button>
                     </div>
                  </div>
                  </div>
              </div>
              <div className="break-line col-md-12">

              </div>

            </div>
        )
      })

    }

    return (
        <div id="user-list-div">
          <div className="search-result-tip col-md-12">
            <div className="col-md-offset-1">
              <p>搜索xx,共检索到xx条信息</p>
            </div>
          </div>
          <div className="user-list-title col-md-12">
            <div className="row">
                <div className="col-md-1">姓名</div>
                <div className="col-md-1">性别</div>
                <div className="col-md-2">学校</div>
                <div className="col-md-1">专业</div>
                <div className="col-md-1">学历</div>
                <div className="col-md-2">邮箱</div>
                <div className="col-md-2">电话</div>
                <div className="col-md-2">操作</div>
            </div>
          </div>
          <div className="user-list-item">
            {result}
          </div>
          <div className="add-user col-md-2 col-md-offset-1">
            <a href="add-user.html">新增用户</a>
          </div>
          <div id="kkpager" className="col-md-10 col-md-offset-1"></div>

          <div className="modal fade bs-example-modal-sm" id="submitModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm" role="document" aria-hidden="true">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
                  <h3 className="modal-title" id="submitModalLabel">修改用户信息!</h3>
                </div>


                <div className="modal-body">
                <form className='form-horizontal form-top-height' onSubmit={this.update}>
                  <div id='account-info'>
                    <label htmlFor='inputSchool' className='col-sm-4 col-md-4 control-label'>学校<span
                        className="error alert alert-danger">*</span></label>
                    <div className={'form-group'}>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputSchool' aria-describedby='helpBlock2'
                               placeholder='学校' onChange={this.handleChange}
                               ref='school' name='school' value={this.state.school} />
                      </div>
                    </div>

                    <label htmlFor='inputName' className='col-sm-4 col-md-4 control-label'>姓名<span
                        className="error alert alert-danger">*</span></label>
                    <div className={'form-group'}>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputName' aria-describedby='helpBlock2'
                               placeholder='姓名' onChange={this.handleChange}
                               name='name' ref='name' value={this.state.name}/>
                      </div>
                    </div>

                    <label htmlFor='inputMobilePhone' className='col-sm-4 col-md-4 control-label'>手机<span
                        className="error alert alert-success">*</span></label>
                    <div className='form-group'>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputMobilePhone' placeholder='手机'
                            onChange={this.handleChange}  name='mobilePhone' ref='mobilePhone'  value={this.state.mobilePhone}/>
                      </div>
                    </div>

                    <label htmlFor='inputEmail' className='col-sm-4 col-md-4 control-label'>邮箱<span
                        className="error alert alert-success">*</span></label>
                    <div className='form-group'>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputEmail' placeholder='邮箱'
                              onChange={this.handleChange}  name='email' ref='email'  value={this.state.email}/>
                      </div>
                    </div>

                    <label htmlFor='inputGender' className='col-sm-4 col-md-4 control-label'>性别<span
                        className="error alert alert-danger">*</span></label>
                    <div className='form-group' >
                      <div className="col-sm-4 col-md-4">

                        <input type="radio" name="gender" className="gender" id='male' onChange={this.handleChange}
                                ref='male' value="M" checked = {this.state.gender==='M'}/>
                        <label htmlFor='male'>男</label>

                        <input type="radio" name="gender" className="gender" id='female' onChange={this.handleChange}
                                ref='female' value="F" checked = {this.state.gender==='F'}/>
                        <label htmlFor='female'>女</label>
                      </div>
                    </div>

                    <label htmlFor='inputMajor' className='col-sm-4 col-md-4 control-label'>专业<span
                        className="error alert alert-danger">*</span></label>
                    <div className={'form-group'}>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputMajor' aria-describedby='helpBlock2'
                               placeholder='专业' onChange={this.handleChange}
                              name='major' ref='major' value={this.state.major}
                               />
                      </div>
                    </div>

                    <label htmlFor='inputDegree' className='col-sm-4 col-md-4 control-label'>学历学位<span
                        className="error alert alert-danger">*</span></label>
                    <div className='form-group'>
                      <div className='col-sm-4 col-md-4' >
                        <select ref='degree' placeholder='学历学位' name='degree' value={this.state.degree}
                            onChange={this.handleChange}    className={'form-control'}>
                          <option value=''>请选择</option>
                          <option value='专科'>专科及以下</option>
                          <option value='本科'>本科</option>
                          <option value='硕士'>硕士</option>
                          <option value='博士'>博士</option>
                        </select>
                      </div>

                    </div>

                    <div className='form-group'>
                      <div className='col-md-4 col-md-offset-3'>
                        <button type='submit' className='btn btn-default'>保存</button>
                      </div>
                      <div className='col-md-4'>
                        <button className="btn btn-default" data-dismiss="modal">关闭</button>
                      </div>

                    </div>
                  </div>
                </form>

                <div className="modal-footer">
                </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    )
  }
});

module.exports = UserList;

// <div className="confirm">
//   <a href="#" className="btn btn-lg btn-danger" data-toggle="modal"
//      data-target={able ? '#submitModal': ''} disabled={able ? '' : 'disabled'}>交卷</a>
// </div>


  // <button className="btn btn-danger submit" onClick={this.submitPaper}>确认提交</button>
