'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var SearchController = require('../../controllers/search-controller');
var searchController = new SearchController();


router.post('/', (req, res, next)=> {

  res.sendFile(path.join(__dirname, '../../public/', 'search.html'));
});

router.get('/', searchController.getSearchResult);


module.exports = router;
