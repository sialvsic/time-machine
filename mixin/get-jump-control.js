'use strict';

function jumpControl(data) {

  var isLoged = data.isLoged;

  //设计思路:
  //当满足 condition的情况下 发向 originPath的请求会跳转到 targetPath

  return [{
    originPath: [
      'vedio.html',
      'upload.html'
    ],
    targetPath: '/register.html',
    condition: !isLoged
  }];
}
module.exports = jumpControl;