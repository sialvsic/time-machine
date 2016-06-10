'use strict';
var React = require('react');
var moment = require('moment');
var Reflux = require('reflux');
var constant = require('../../../../mixin/constant');
var VideoManageAction = require('../../actions/video-manage/video-manage-actions');
var VideoManageStore = require('../../store/video-manage/video-manage-store');
var page = require('page');

function getParameter(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


var VideoList = React.createClass({
  mixins: [Reflux.connect(VideoManageStore)],

  getInitialState:function(){
    return {
      title: '',
      extension: '',
      size: '',
      category: '',
      label: '',
      description: '',
      createTime: '',
      _id: ''
    }
  },

  componentDidUpdate: function () {

    var itemLength = this.props.itemLength;
    //init
    if(itemLength!==0){
          jQuery(function () {
            var itemPerPage = constant.itemPerPage.video;
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
              hrefFormer: 'video-manage.html',

              getLink: function (n) {
                var href = window.location.href.split('video-manage.html')[1];
                if(!href){
                  //当不存在后面的值时
                  return this.hrefFormer + "?type=all&&key=''&&page=" + n;
                }
                var frontPage = href.split('&&page=')[0];
                return this.hrefFormer + frontPage  + "&&page=" + n;
              }
            });
          });
      }

  },

  showModel: function(evt){
    var id = evt.target.name;
    VideoManageAction.getVideoInfo(id);
    jQuery('#submitModal').modal('show');
  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;
    console.log(newState);
    console.log(stateName);

    this.setState({[stateName]: newState});
  },

  updateInfo:function(evt){
    evt.preventDefault();

    var videoData = {
      title: this.state.title,
      extension: this.state.extension,
      size: this.state.size,
      category: this.state.category,
      label: this.state.label,
      description: this.state.description,
      _id: this.state._id
    };

    VideoManageAction.updateVideoInfo(videoData);
    jQuery('#submitModal').modal('hide');
    page(window.location.href);
  },

  deleteInfo:function(evt){
    evt.preventDefault();
    var videoId = evt.target.name;
    VideoManageAction.deleteVideoInfo(videoId);

    jQuery(".edit button[name="+videoId+"]").hide();
    jQuery(".delete button[name="+videoId+"]").html('已删除');
  },

  calcTime:function(size){
    //GB MB KB B
    var B = 1024 ;
    var KB = B ;
    var MB = KB * B ;
    var GB = MB * B ;
    var TB = GB * B ;
    if(size < B ){
      return size + 'b';
    }else if(size > B && size < KB ){
      return (size / B).toFixed(2) + 'B';
    }else if(size > KB && size < MB){
      return (size / KB).toFixed(2) + 'KB';
    }else if(size > MB && size < GB){
      return (size / MB).toFixed(2) + 'MB';
    }else if(size > GB && size < TB){
      return (size / GB).toFixed(2) + 'GB';
    }

  },

  render: function () {

    var videolistResults = this.props.videoList;
    var itemLength = this.props.itemLength;

    var result;
    if (videolistResults.length !== 0) {
      result = videolistResults.map((videoItem, index)=> {
        return (
            <div key={index}>
              <div className="col-md-12 videoItem-content" >
                <div className="row">
                  <div className="col-md-1">{videoItem.title}</div>
                  <div className="col-md-1">{videoItem.extension}</div>
                  <div className="col-md-1">{this.calcTime(videoItem.size)}</div>
                  <div className="col-md-1">{videoItem.category}</div>
                  <div className="col-md-2">{videoItem.label}</div>
                  <div className="col-md-2">{videoItem.description}</div>
                  <div className="col-md-2">{moment.unix(videoItem.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                  <div className="col-md-2">
                     <div className="edit operation">
                        <button name={videoItem._id} onClick={this.showModel}>编辑</button>
                     </div>
                     <div className="delete operation">
                        <button name={videoItem._id} onClick={this.deleteInfo}>删除</button>
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
        <div id="video-list-div">
          <div className="search-result-tip col-md-12">
            <div className="col-md-offset-1">
              <p>共检索到{itemLength}条信息</p>
            </div>
          </div>
          <div className="video-list-title col-md-12">
            <div className="row">
                <div className="col-md-1">视频名称</div>
                <div className="col-md-1">扩展名</div>
                <div className="col-md-1">文件大小</div>
                <div className="col-md-1">视频类型</div>
                <div className="col-md-2">标签</div>
                <div className="col-md-2">描述</div>
                <div className="col-md-2">上传时间</div>
                <div className="col-md-2">操作</div>
            </div>
          </div>
          <div className="video-list-item">
            {result}
          </div>

          <div id="kkpager" className="col-md-10 col-md-offset-1"></div>

          <div className="modal fade bs-example-modal-sm" id="submitModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm" role="document" aria-hidden="true">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
                  <h3 className="modal-title" id="submitModalLabel">修改视频信息!</h3>
                </div>


                <div className="modal-body">
                <form className='form-horizontal form-top-height' onSubmit={this.updateInfo}>
                  <div id='account-info'>
                    <label htmlFor='inputTitle' className='col-sm-4 col-md-4 control-label'>视频名称<span
                        className="error alert alert-danger">*</span></label>
                    <div className={'form-group'}>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputTitle' aria-describedby='helpBlock2'
                               placeholder='视频名称' onChange={this.handleChange}
                               ref='title' name='title' value={this.state.title} />
                      </div>
                    </div>

                    <label htmlFor='inputExtension' className='col-sm-4 col-md-4 control-label'>扩展名<span
                        className="error alert alert-danger">*</span></label>
                    <div className={'form-group'}>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputExtension' aria-describedby='helpBlock2'
                               placeholder='扩展名' onChange={this.handleChange} disabled
                               name='extension' ref='extension' value={this.state.extension}/>
                      </div>
                    </div>

                    <label htmlFor='inputSize' className='col-sm-4 col-md-4 control-label'>文件大小<span
                        className="error alert alert-success">*</span></label>
                    <div className='form-group'>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputSize' placeholder='文件大小' disabled
                            onChange={this.handleChange}  name='size' ref='size'  value={this.state.size}/>
                      </div>
                    </div>

                    <label htmlFor='inputCategory' className='col-sm-4 col-md-4 control-label'>类型<span
                        className="error alert alert-danger">*</span></label>
                    <div className='form-group'>
                      <div className='col-sm-4 col-md-4' >
                        <select ref='category' placeholder='类型' id='inputCategory' name='category' value={this.state.category}
                            onChange={this.handleChange}    className={'form-control'}>
                          <option value=''>请选择</option>
                          <option value='电视剧'>电视剧</option>
                          <option value='电影'>电影</option>
                          <option value='动漫'>动漫</option>
                          <option value='综艺'>综艺</option>
                          <option value='教育'>教育</option>
                          <option value='新闻'>新闻</option>
                          <option value='音乐'>音乐</option>
                          <option value='科技'>科技</option>
                          <option value='校园'>校园</option>
                          <option value='原创'>原创</option>
                          <option value='其他'>其他</option>
                        </select>
                      </div>
                    </div>

                    <label htmlFor='inputLabel' className='col-sm-4 col-md-4 control-label'>标签<span
                        className="error alert alert-success">*</span></label>
                    <div className='form-group'>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputLabel' placeholder='标签'
                              onChange={this.handleChange}  name='label' ref='label'  value={this.state.label}/>
                      </div>
                    </div>

                    <label htmlFor='inputDescription' className='col-sm-4 col-md-4 control-label'>描述<span
                        className="error alert alert-danger">*</span></label>
                    <div className={'form-group'}>
                      <div className='col-sm-4 col-md-4'>
                        <input type='text' className='form-control' id='inputDescription' aria-describedby='helpBlock2'
                               placeholder='描述' onChange={this.handleChange}
                              name='description' ref='description' value={this.state.description}
                               />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='col-md-4 col-md-offset-3'>
                        <button type='submit' className='btn btn-default'>保存</button>
                      </div>
                      <div className='col-md-4'>
                        <button className="btn btn-default" data-dismiss="modal">关闭</button>
                      </div>

                    </div>
                  </div>
                </form>

                <div className="modal-footer">
                </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    )
  }
});

module.exports = VideoList;

// <div className="confirm">
//   <a href="#" className="btn btn-lg btn-danger" data-toggle="modal"
//      data-target={able ? '#submitModal': ''} disabled={able ? '' : 'disabled'}>交卷</a>
// </div>


  // <button className="btn btn-danger submit" onClick={this.submitPaper}>确认提交</button>
