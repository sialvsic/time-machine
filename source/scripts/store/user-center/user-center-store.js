'use strict';

var Reflux = require('reflux');
var UserCenterActions = require('../../actions/user-center/user-center-actions');
var request = require('superagent');
var page = require('page');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');


var UserDetailStore = Reflux.createStore({
  listenables: [UserCenterActions],

  onLoadUserDetail: function () {
    request.get('/user-detail')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
          this.trigger(res.body);
        });
  },

  onLoadStar: function (page) {

    request.get('/user-detail/star/'+ page|| 1)
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
           this.trigger({
             starList:res.body.starList,
             starItemLength:res.body.itemLength,
             pageNo:res.body.pageNo
           });

        });
  },

  onUpdateUserDetail: function (userData) {
    request.put('/user-detail')
        .set('Content-Type', 'application/json')
        .send({
          data: userData
        })
        .use(errorHandler)
        .end((err, req) => {
          if(err){
            console.log('个人信息更新失败');
          }
        });
  },

  onChangeState: function (state, currentState) {
    if (state !== currentState) {
      this.trigger({
        currentState: state
      });
    }
  },

  onChangeGender: function (name) {
    this.trigger({gender: name});
  },

  onValidateGender: function (genderError) {
    if (genderError === true) {
      this.trigger({genderError: false});
    }
  },

  onCheckGender: function (gender) {
    if (gender === '') {
      this.trigger({genderError: true});
    } else {
      this.trigger({genderError: false});
    }
  }
});
module.exports = UserDetailStore;
