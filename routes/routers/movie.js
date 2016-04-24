'use strict';

var express = require('express');
var router = express.Router();
var MovieController = require('../../controllers/movie-controller');
var movieController = new MovieController();

router.get('/', movieController.getMovies);

module.exports = router;