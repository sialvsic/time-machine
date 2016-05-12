'use strict';

var constant = {
  httpCode: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    PRECONDITION_FAILED: 412,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
  },
  time: {
    MINUTE_PER_HOUR: 60,
    SECONDS_PER_MINUTE: 60,
    HOURS_PER_DAY: 24,
    MILLISECOND_PER_SECONDS: 1000
  },
  backConstant: {
    MOBILE_PHONE_LENGTH: 11,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 16,
    SUCCESSFUL_STATUS: 200,
    FAILING_STATUS: 404,
    SERVER_ERROR: 500
  },
  itemPerPage: {
    search: 3, //搜索页面的每页显示的数量
    movie: 6,
    star: 2,    //个人中心我的收藏显示到数量
    user: 4   //管理员用户管理界面每页显示到数量
  }
};

module.exports = constant;
