'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var page= require('page');

var Navigation = require('./components/navigation/navigation.component');
var UserList = require('./components/user-manage/userlist.component');
var Account = require('./components/account/account.component');
var UserManageAction = require('./actions/user-manage/user-manage-actions');
var UserManageStore = require('./store/user-manage/user-manage-store');


var AddUser = React.createClass({
  mixins: [Reflux.connect(UserManageStore)],

  getInitialState:function(){
    return {
    }
  },

  addUser:function(evt){
   evt.preventDefault();

   var gender = this.refs.male.checked ? 'M':'F';

    var userData = {
      school: this.refs.school.value,
      name: this.refs.name.value,
      mobilePhone: this.refs.mobilePhone.value,
      email: this.refs.email.value,
      gender: gender,
      major: this.refs.major.value,
      degree: this.refs.degree.value,
      password: this.refs.password.value
    };

    UserManageAction.addUserInfo(userData);
    page('user-manage.html');
  },

  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <div id="add-user-form">
              <form className='form-horizontal form-top-height' onSubmit={this.addUser}>
                <div id='account-info'>
                  <label htmlFor='inputSchool' className='col-sm-4 col-md-4 control-label'>学校<span
                      className="error alert alert-danger">*</span></label>
                  <div className={'form-group'}>
                    <div className='col-sm-4 col-md-4'>
                      <input type='text' className='form-control' id='inputSchool' aria-describedby='helpBlock2'
                             placeholder='学校'
                             ref='school' name='school' />
                    </div>
                  </div>

                  <label htmlFor='inputName' className='col-sm-4 col-md-4 control-label'>姓名<span
                      className="error alert alert-danger">*</span></label>
                  <div className={'form-group'}>
                    <div className='col-sm-4 col-md-4'>
                      <input type='text' className='form-control' id='inputName' aria-describedby='helpBlock2'
                             placeholder='姓名'
                             name='name' ref='name' />
                    </div>
                  </div>

                  <label htmlFor='inputMobilePhone' className='col-sm-4 col-md-4 control-label'>手机<span
                      className="error alert alert-success">*</span></label>
                  <div className='form-group'>
                    <div className='col-sm-4 col-md-4'>
                      <input type='text' className='form-control' id='inputMobilePhone' placeholder='手机'
                          name='mobilePhone' ref='mobilePhone'  />
                    </div>
                  </div>

                  <label htmlFor='inputEmail' className='col-sm-4 col-md-4 control-label'>邮箱<span
                      className="error alert alert-success">*</span></label>
                  <div className='form-group'>
                    <div className='col-sm-4 col-md-4'>
                      <input type='text' className='form-control' id='inputEmail' placeholder='邮箱'
                          name='email' ref='email'  />
                    </div>
                  </div>

                  <label htmlFor='inputPassword' className='col-sm-4 col-md-4 control-label'>密码<span
                      className="error alert alert-success">*</span></label>
                  <div className='form-group'>
                    <div className='col-sm-4 col-md-4'>
                      <input type='text' className='form-control' id='inputPassword' placeholder='密码'
                          name='password' ref='password'  />
                    </div>
                  </div>

                  <label htmlFor='inputGender' className='col-sm-4 col-md-4 control-label'>性别<span
                      className="error alert alert-danger">*</span></label>
                  <div className='form-group' >
                    <div className="col-sm-4 col-md-4">

                      <input type="radio" name="gender" className="gender" id='male'
                              ref='male' value="M"/>
                      <label htmlFor='male'>男</label>

                      <input type="radio" name="gender" className="gender" id='female'
                              ref='female' value="F"/>
                      <label htmlFor='female'>女</label>
                    </div>
                  </div>

                  <label htmlFor='inputMajor' className='col-sm-4 col-md-4 control-label'>专业<span
                      className="error alert alert-danger">*</span></label>
                  <div className={'form-group'}>
                    <div className='col-sm-4 col-md-4'>
                      <input type='text' className='form-control' id='inputMajor' aria-describedby='helpBlock2'
                             placeholder='专业'
                            name='major' ref='major'
                             />
                    </div>
                  </div>

                  <label htmlFor='inputDegree' className='col-sm-4 col-md-4 control-label'>学历学位<span
                      className="error alert alert-danger">*</span></label>
                  <div className='form-group'>
                    <div className='col-sm-4 col-md-4' >
                      <select ref='degree' placeholder='学历学位' name='degree'
                         className={'form-control'}>
                        <option value=''>请选择</option>
                        <option value='专科'>专科及以下</option>
                        <option value='本科'>本科</option>
                        <option value='硕士'>硕士</option>
                        <option value='博士'>博士</option>
                      </select>
                    </div>
                  </div>

                  <div className='form-group add-user-form-end'>
                    <div className='col-md-3 col-md-offset-4'>
                      <button type='submit' className='btn btn-default'>保存</button>
                    </div>
                    <div className='col-md-4'>
                      <a href="user-manage.html" className="btn btn-default">返回</a>
                    </div>

                  </div>
                </div>
              </form>

          </div>

        </div>
    )
  }
});


ReactDOM.render(
    <AddUser/>
    ,
    document.getElementById('add-user-div')
);
