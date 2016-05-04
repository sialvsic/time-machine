'use strict';
var React = require('react');
var moment = require('moment');


var SearchResult = React.createClass({

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
                  <img src={searchResult.screenshotsPath} alt=""/>
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
                         href={ 'video.html#' + searchResult._id}>点此播放</a>
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
    return (
        <div id="search-result-div">
          <div className="search-result-tip col-md-12">
            <div className="col-md-offset-1">
              <p>搜索{this.props.searchContent},共检索到{searchResults.length}个视频</p>
            </div>
          </div>
          <div className="search-result-item col-md-8">
            {result}
          </div>
        </div>
    )
  }
});

module.exports = SearchResult;