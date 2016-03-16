'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var route = require('./routes/route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

route.setRoutes(app);

var server = app.listen(5299, function () {

  var port = server.address().port;

  console.log('App listening at http://localhost:' + port);
});