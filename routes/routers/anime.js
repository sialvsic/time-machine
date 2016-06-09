'use strict';

var express = require('express');
var router = express.Router();
var AnimeController = require('../../controllers/anime-controller');
var animeController = new AnimeController();

router.get('/', animeController.getAnimes);

module.exports = router;
