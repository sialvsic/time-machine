'use strict';

var Reflux = require('reflux');
var UploadActions = require('../../actions/upload/upload-actions');
var page = require('page');
var validate = require('validate.js');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var async = require('async');
var errorHandler = require('../../../../middleware/error-handler');


var UploadStore = Reflux.createStore({
  listenables: UploadActions,


  onSubmitInfo: function (form) {
    request.post('/upload/form')
        .set('Content-Type', 'application/json')
        .send(form)
        .use(errorHandler)
        .end((err, req)=> {
          if (req.body.status === constant.httpCode.OK) {
            alert('上传并保存成功');
            page('index.html');
          }
        });
  }


});

module.exports = UploadStore;
