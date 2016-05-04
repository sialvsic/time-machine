'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var MoviesmoreController = require('../../controllers/moviesmore-controller');
var moviesmoreController = new MoviesmoreController();

router.get('/', moviesmoreController.getMoviesMore);


module.exports = router;
