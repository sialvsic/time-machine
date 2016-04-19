'use strict';

var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var yamlConfig = require('node-yaml-config');
var mongoConn = require('./services/mongo-conn');
var MongoStore = require('connect-mongo')(session);
var app = express();


var config = yamlConfig.load(__dirname + '/config/config.yml');
var route = require('./routes/route');


var env = ['production', 'test', 'staging'].indexOf(process.env.NODE_ENV) < 0 ? 'development' : process.env.NODE_ENV;

app.use(cookieParser());
app.use(session({
  secret: 'Time-machine', resave: false, saveUninitialized: false,
  store: new MongoStore({
    url: config.database,
    ttl: config.sessionTtl
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(multer({
  dest: './public/vedio',

  onFileUploadStart: function (file) {
    //console.log("upload start");
    //return false;
  },

  onFileUploadComplete: function (file) {
    //console.log("upload complete");
    //console.log(file);
    return;
  },
  rename: function (fieldname, filename) {

    //console.log(fieldname);
    //console.log(filename);
    return filename;
  }
}));


app.use(express.static(__dirname + '/public'));

route.setRoutes(app);

var server = app.listen(config.port, function () {

  var port = server.address().port;
  console.log('Current environment is: ' + env);
  console.log('App listening at http://localhost:' + port);
  mongoConn.start(config.database);

});