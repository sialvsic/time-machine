'use strict';
var mongoose = require('mongoose');

function LogoutController() {
}

LogoutController.prototype.logout = (req, res, next) => {

  if (!req.session.user) {
    res.end();
    return;
  }

  req.session.destroy(function (err) {
    if (err)  return next(err);
    res.end();
  });
};

module.exports = LogoutController;
