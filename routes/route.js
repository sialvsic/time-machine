'use strict';

exports.setRoutes = function (app) {
  //app.use('/', require('./routers/index'));
  app.use('/register', require('./routers/register'));
  app.use('/login', require('./routers/login'));

};
