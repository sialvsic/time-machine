'use strict';
var React = require('react');
var moment = require('moment');
var constant = require('../../../../mixin/constant');


function getParameter(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


var SearchResult = React.createClass({

  componentDidUpdate: function () {

    var itemLength = this.props.itemLenght;


    //init
    jQuery(function () {
      var itemPerPage = constant.itemPerPage.search;
      var totalPage = Math.ceil(itemLength / itemPerPage);
      var totalRecords = itemLength;
      var pageNo = getParameter('page');
      if (!pageNo) {
        pageNo = 1;
      }
      //生成分页
      //分页使用的是https://github.com/pgkk/kkpager
      //有些参数是可选的，比如lang，若不传有默认值
      kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        //链接前部
        hrefFormer: 'search',

        getLink: function (n) {

          var href = decodeURI(window.location.href.split('&&')[0]);
          var url = href.split('?q=')[1];

          return this.hrefFormer + "?q=" + url + "&&page=" + n;
        }
        /*
         ,lang				: {
         firstPageText			: '首页',
         firstPageTipText		: '首页',
         lastPageText			: '尾页',
         lastPageTipText			: '尾页',
         prePageText				: '上一页',
         prePageTipText			: '上一页',
         nextPageText			: '下一页',
         nextPageTipText			: '下一页',
         totalPageBeforeText		: '共',
         totalPageAfterText		: '页',
         currPageBeforeText		: '当前第',
         currPageAfterText		: '页',
         totalInfoSplitStr		: '/',
         totalRecordsBeforeText	: '共',
         totalRecordsAfterText	: '条数据',
         gopageBeforeText		: '&nbsp;转到',
         gopageButtonOkText		: '确定',
         gopageAfterText			: '页',
         buttonTipBeforeText		: '第',
         buttonTipAfterText		: '页'
         }*/
      });
    });
  },

  render: function () {

    var searchResults = this.props.searchResults;
    var result;
    var resultNumber = 0;
    if (searchResults.length !== 0) {
      resultNumber = searchResults.length;
      result = searchResults.map((searchResult, index)=> {
        return (
            <div key={index}>
              <div className="col-md-12">
                <div className="col-md-5">
                  <img src={searchResult.lowScreenshotsPath} alt=""/>
                </div>
                <div className="col-md-7">
                  <div>
                    <div>
                      <p className="search-result-title">标题: {searchResult.title}</p>
                      <p className="search-result-type">类型: {searchResult.category}</p>
                      <p className="search-result-time">
                        上传时间: {moment.unix(searchResult.createTime).format('YYYY-MM-DD')}</p>
                      <p className="search-result-desc">简介: {searchResult.description}</p></div>
                  </div>
                  <div>
                    <div className="click-play">
                      <a className="button button-highlight button-rounded button-small"
                         href={ 'video.html?' + searchResult._id}>点此播放</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="break-line col-md-12">

              </div>

            </div>
        )
      })

    }


    var href = decodeURI(window.location.href.split('&&')[0]);
    var searchContent = href.split('?q=')[1];

    return (
        <div id="search-result-div">
          <div className="search-result-tip col-md-12">
            <div className="col-md-offset-1">
              <p>搜索{searchContent},共检索到{this.props.itemLenght}个视频</p>
            </div>
          </div>
          <div className="search-result-item col-md-8">
            {result}
          </div>
          <div id="kkpager" className="col-md-7 col-md-offset-1"></div>
        </div>
    )
  }
});

module.exports = SearchResult;
