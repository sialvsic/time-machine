'use strict';

var getJumpControl = require('../mixin/get-jump-control');
var async = require('async');

function pathControl(url, data) {

  //null
  //{
  // isLoged: false,
  //}

  var arr = url.split('/');

  arr.forEach(function (item, i) {
    arr[i] = item.split('?')[0];
  });

  var lastElement = arr[arr.length - 1];
  //dashboard.html


  var redirectionAddress;
  var needRedirect = false;
  var jumpControl = getJumpControl(data);

  jumpControl.forEach((item) => {

    //当在originPath中检索出存在某一特定的html时 并且condition为真时就跳转
    if (~item.originPath.indexOf(lastElement) && item.condition) {
      redirectionAddress = item.targetPath;
      needRedirect = true;
    }
  });

  return {
    needRedirect: needRedirect,
    targetPath: redirectionAddress
  };
}

module.exports = function (req, res, next) {
  var userId;

  async.parallel({
    isLoged: function (done) {
      done(null, Boolean(req.session.user));
    }

  }, function (err, data) {

    //console.log(data);
    //{
    // isLoged: false
    //}

    //console.log(req.url);
    //  '/dashboard.html'

    var result = pathControl(req.url, data);

    if (result.needRedirect) {
      res.redirect(result.targetPath);
    } else {
      next();
    }
  });
};