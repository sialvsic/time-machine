'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
var UserCenterActions = require('../../actions/user-center/user-center-actions');
var Reflux = require('reflux');
var UserCenterStore = require('../../store/user-center/user-center-store');
var constant = require('../../../../mixin/constant');


function getParameter(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

var UserCenterStar = React.createClass({
  mixins: [Reflux.connect(UserCenterStore)],

  getInitialState:function(){
    return  {
      currentState:'userDetail'
    };
  },

  componentWillReceiveProps: function () {

    var itemLength = this.props.starItemLength;

    if(itemLength!==0){
      //init
      jQuery(function () {
        var itemPerPage = constant.itemPerPage.star;
        var totalPage = Math.ceil(itemLength / itemPerPage);

        var totalRecords = itemLength;

        var pageNo = getParameter('page');
        if (!pageNo) {
          pageNo = 1;
        }

        kkpager.generPageHtml({
          pno: pageNo,
          //总页码
          total: totalPage,
          //总数据条数
          totalRecords: totalRecords,
          //链接前部
          hrefFormer: 'user-center.html',
          getLink: function (n) {
            // var href = decodeURI(window.location.href.split('&&')[0]);
            // var url = href.split('?q=')[1];
            return this.hrefFormer + "?mark=star" + "&&page=" + n;
          }
        });
        });
    }
  },


  render: function () {
    var classString = (this.state.currentState === 'star' ? '' : ' hide');
    var result;
    var starList = this.props.starList;
    if(starList.length!==0){
      result= starList.map((starItem,index)=>{
        return (
          <div key={index}>
               <div className="col-md-12">
                    <div className="col-md-5">
                     <img src={starItem.lowScreenshotsPath} alt=""/>
                    </div>
            <div className="col-md-7">
              <div>
                <div>
                  <p className="search-result-title">标题: {starItem.title}</p>
                  <p className="search-result-type">类型: {starItem.category}</p>
                  <p className="search-result-time">
                    上传时间: {moment.unix(starItem.createTime).format('YYYY-MM-DD')}</p>
                  <p className="search-result-desc">简介: {starItem.description}</p>
                </div>
              </div>
              <div>
                <div className="click-play">
                  <a className="button button-highlight button-rounded button-small"
                     href={ 'video.html?' + starItem._id}>点此播放</a>
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
      <div className={'col-md-9 col-sm-9 col-xs-12 star' + classString}>
        <div className="content">
          <div id="star-list">
            {result}
          </div>
        <div id="kkpager" className="col-md-10 col-md-offset-1"></div>

        </div>
      </div>
    );
  }
});


module.exports = UserCenterStar;
