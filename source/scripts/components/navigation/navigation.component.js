'use strict';
var React = require('react');
var $ = require('jquery');

var Navigation = React.createClass({


  validate: function () {
    var text = this.refs.searchText.value;
    var searchURL = '/search?q=' + text.trim();
    $('form').attr('action', searchURL);
  },


  render: function () {
    return (
        <div id="navigation" className="container-fluid ">
          <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-2 col-sm-offset-1">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"/>
                      <span className="icon-bar"/>
                      <span className="icon-bar"/>
                    </button>
                    <a className="navbar-brand" href="index.html">时光机</a>
                  </div>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                  <div className="col-lg-5 col-lg-offset-1 col-md-6 col-sm-6">
                    <form action="/search?q=" method="post" className="search-form navbar-form navbar-left"
                          role="search">
                      <div className="search-bar form-group">
                        <input type="text" onChange={this.validate} ref="searchText"
                               className="search-text form-control"
                               placeholder="全站搜索"/>
                      </div>
                      <button type="submit"
                              className="search-button button button-glow button-rounded button-raised button-action button-small ">
                        穿越一下
                      </button>
                    </form>
                  </div>
                  <div className="nav-account col-lg-3 col-md-3 col-sm-3">

                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
    );
  }
});

module.exports = Navigation;
