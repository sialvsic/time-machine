'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var Navigation = require('./components/navigation/navigation.component');
var Account = require('./components/account/account.component');
var UploadActions = require('./actions/upload/upload-actions');
var UploadStore = require('./store/upload/upload-store');

var Upload = React.createClass({
  mixins: [Reflux.connect(UploadStore)],

  componentDidMount: function () {

    $("#fileuploader").uploadFile({
      url: "/upload/",
      fileName: "fileInfo",
      multiple: false,
      dragDrop: true,
      showDownload: false,
      showDelete: true,
      showProgress: true,
      showFileSize: true,
      uploadStr: '上传文件',
      acceptFiles: 'video/*',
      //dragDropStr: '请拖动文件到此处',    这个不work
      onSuccess: function (files, response, xhr, pd) {
        //上传成功一个后，设置上传按钮不可点击，即一次只能上传一个视频
        if(response.status === 403){
          //说明格式不正确
          $('#fileuploader  input').attr({'disabled':'true'});
          $('.upload-tip').html('您上传的视频格式不正确，请删除后重新上传');
          $('.upload-tip').css({
            color:'red'
          });

        }else{
          $('#fileuploader  input').attr({'disabled':'true'});
        }
//        console.log(files); ["You Are My Everything - Gummy.mp3"]
//        console.log(response);  后台的数据
//        console.log(xhr); 一个大对象 jquery xhr Object {readyState: 4, responseText: "1223", status: 200, statusText: "OK"}
//        console.log(pd) progress div {statusbar: n.fn.init[1], preview: n.fn.init[1], filename: n.fn.init[1], progressDiv: n.fn.init[1], progressbar: n.fn.init[1]…}abort: n.fn.init[1]cancel: n.fn.init[1]del: n.fn.init[1]done: n.fn.init[1]download: n.fn.init[1]0: div.ajax-file-upload-greencontext: undefinedlength: 1prevObject: n.fn.init[1]__proto__: Object[0]filename: n.fn.init[1]preview: n.fn.init[1]progressDiv: n.fn.init[1]progressbar: n.fn.init[1]statusbar: n.fn.init[1]__proto__: Object

        //alert(JSON.stringify(response));

      },
      onError: function (files, status, message, pd){
        console.log('error');

      },
      statusBarWidth: '100%',  //这是上传的状态栏的宽度
      deleteCallback: function (data, pd) {
        $('#fileuploader  input').attr({'disabled':false});
        //此处的data 有问题 ,data 的值是route那里send回来的值
//         console.log(data);
//         console.log(data.length);
//
//         for (var i = 0; i < data.length; i++) {
// //          alert(data);
// //          $.post("delete.php", {op: "delete", name: data[i]},
// //                  function (resp, textStatus, jqXHR) {
// //                    //Show Message
// //                    alert("File Deleted");
// //                  });
//
//         }

        pd.statusbar.hide(); //You choice.
      },

      downloadCallback: function (filename, pd) {
        //location.href = "download.php?filename=" + filename;
      }
    });

  },

  submit: function (evt) {
    evt.preventDefault();
    var form = {};
    form.title = this.refs.title.value;
    form.category = this.refs.category.value;
    form.label = this.refs.label.value;
    form.description = this.refs.description.value;

    var isSubmitAllowed = true;
    //isSubmitAllowed = checkSubmitInfo();
    if (isSubmitAllowed) {
      UploadActions.submitInfo(form);
    }
  },


  render: function () {
    return (
        <div >
          <Navigation>
            <Account/>
          </Navigation>
          <div className="upload-tip">
            <h3>仅支持上传mp4/flv/webm/ogv格式的视频</h3>
          </div>
          <div id="fileuploader">Upload</div>
          <div className="panel panel-default well">

            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputTitle" className="col-sm-1 control-label">标题</label>
                <div className="col-sm-11">
                  <input type="text" className="form-control" ref="title" id="inputTitle"
                         placeholder="请输入标题 30字以内"></input>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputCategory" className="col-sm-1 control-label">分类</label>
                <div className="col-sm-11">
                  <select className="form-control" ref="category" id="inputCategory">
                    <option>电视剧</option>
                    <option>电影</option>
                    <option>动漫</option>
                    <option>综艺</option>
                    <option>教育</option>
                    <option>新闻</option>
                    <option>音乐</option>
                    <option>科技</option>
                    <option>校园</option>
                    <option>原创</option>
                    <option>其他</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputLabel" className="col-sm-1 control-label">标签</label>
                <div className="col-sm-11">
                  <input type="text" className="form-control" ref="label" id="inputLabel" placeholder="请输入标签"></input>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputDescription" className="col-sm-1 control-label">描述</label>
                <div className="col-sm-11">
                  <textarea className="form-control" ref="description" id="inputDescription" rows="3"></textarea>
                </div>
              </div>

              <div className="form-group">
                <button id="form-submit" className="btn btn-default"   onClick={this.submit}>提交</button>
              </div>

            </form>

          </div>
        </div>
    )
  }
});


ReactDOM.render(
    <Upload/>
    ,
    document.getElementById('upload-div')
);
