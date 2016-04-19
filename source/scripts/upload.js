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
//        console.log(files); ["You Are My Everything - Gummy.mp3"]
//        console.log(response);  后台的数据
//        console.log(xhr); 一个大对象 jquery xhr Object {readyState: 4, responseText: "1223", status: 200, statusText: "OK"}
//        console.log(pd) progress div {statusbar: n.fn.init[1], preview: n.fn.init[1], filename: n.fn.init[1], progressDiv: n.fn.init[1], progressbar: n.fn.init[1]…}abort: n.fn.init[1]cancel: n.fn.init[1]del: n.fn.init[1]done: n.fn.init[1]download: n.fn.init[1]0: div.ajax-file-upload-greencontext: undefinedlength: 1prevObject: n.fn.init[1]__proto__: Object[0]filename: n.fn.init[1]preview: n.fn.init[1]progressDiv: n.fn.init[1]progressbar: n.fn.init[1]statusbar: n.fn.init[1]__proto__: Object

        //alert(JSON.stringify(response));

      },
      statusBarWidth: '100%',  //这是上传的状态栏的宽度
      deleteCallback: function (data, pd) {
        //此处的data 有问题 ,data 的值是route那里send回来的值
        console.log(data);
        console.log(data.length);

        for (var i = 0; i < data.length; i++) {
//          alert(data);
//          $.post("delete.php", {op: "delete", name: data[i]},
//                  function (resp, textStatus, jqXHR) {
//                    //Show Message
//                    alert("File Deleted");
//                  });

        }

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
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div id="fileuploader">Upload</div>
          <div className="panel panel-default well">

            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputTitle" className="col-sm-1 control-label">标题</label>
                <div className="col-sm-11">
                  <input type="email" className="form-control" ref="title" id="inputTitle"
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
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputLabel" className="col-sm-1 control-label">标签</label>
                <div className="col-sm-11">
                  <input type="email" className="form-control" ref="label" id="inputLabel" placeholder="请输入标签"></input>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputDescription" className="col-sm-1 control-label">描述</label>
                <div className="col-sm-11">
                  <textarea className="form-control" ref="description" id="inputDescription" rows="3"></textarea>
                </div>
              </div>

              <div className="form-group">
                <button id="form-submit" className="btn btn-default" onClick={this.submit}>提交</button>
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