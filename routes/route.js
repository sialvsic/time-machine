'use strict';

exports.setRoutes = function (app) {
  //app.use('/', require('./routers/index'));
  app.use('/register', require('./routers/register'));
  app.use('/login', require('./routers/login'));
  app.use('/logout', require('./routers/logout'));
  app.use('/account', require('./routers/account'));
  app.use('/upload', require('./routers/upload'));
  app.use('/movies', require('./routers/movie'));
  app.use('/tvplays', require('./routers/tvplays'));
  app.use('/video', require('./routers/video'));
  app.use('/search', require('./routers/search'));
  app.use('/categorymore', require('./routers/categorymore'));
  app.use('/user-detail', require('./routers/user-detail'));
  app.use('/user-manage', require('./routers/user-manage'));
  app.use('/video-manage', require('./routers/video-manage'));

};
