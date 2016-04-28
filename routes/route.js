'use strict';

exports.setRoutes = function (app) {
  //app.use('/', require('./routers/index'));
  app.use('/register', require('./routers/register'));
  app.use('/login', require('./routers/login'));
  app.use('/account', require('./routers/account'));
  app.use('/upload', require('./routers/upload'));
  app.use('/movies', require('./routers/movie'));
  app.use('/tvplays', require('./routers/tvplays'));
  app.use('/video', require('./routers/video'));

};
