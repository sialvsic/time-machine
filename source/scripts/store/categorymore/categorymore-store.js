'use strict';

var Reflux = require('reflux');
var CategoryMoreActions = require('../../actions/categorymore/categorymore-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');


var CategoryMoreStore = Reflux.createStore({
  listenables: CategoryMoreActions,

  onGetCategoryMore: function (href) {

    var field = href.split(':5299/')[1];
    var page = href.split('?page=')[1];
    var html = field.split('?page=')[0];

    var categoryHash = [{
      html: 'moviesmore.html',
      category: '电影'
    }, {
      html: 'tvplaysmore.html',
      category: '电视剧'
    },{
      html: 'animesmore.html',
      category: '动漫'
    },{
      html: 'varietiesmore.html',
      category: '综艺'
    },{
      html: 'educatesmore.html',
      category: '教育'
    },{
      html: 'musicsmore.html',
      category: '音乐'
    },{
      html: 'newsmore.html',
      category: '新闻'
    },{
      html: 'technologysmore.html',
      category: '科技'
    },{
      html: 'originalsmore.html',
      category: '原创'
    },{
      html: 'othersmore.html',
      category: '其他'
    },{
      html: 'schoolsmore.html',
      category: '校园'
    }];

    var item = categoryHash.find((item)=> {
      return item.html === html;
    });

    request.get('/categorymore')
        .set('Content-Type', 'application/json')
        .query({
          categorymore: item.category,
          page: page || 1
        })
        .use(errorHandler)
        .end((err, req) => {

          this.trigger({
            categoryMoreResults: req.body.doc,
            itemLenght: req.body.allDatalength,
            category: req.body.category
          })
        });
  }

});

module.exports = CategoryMoreStore;
