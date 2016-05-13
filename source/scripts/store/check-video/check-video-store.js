'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var CheckVideoAction = require('../../actions/check-video/check-video-actions');

var CheckVideoStore = Reflux.createStore({
    listenables: CheckVideoAction,

    onGetAllCheckVideoList: function(page) {
        console.log('i am in store');
        var videopage = page || 1;

        var url = '/video-manage/check';

        request.get(url)
            .set('Content-Type', 'application/json')
            .query({
                page: videopage
            })
            .use(errorHandler)
            .end((err, req) => {
                this.trigger({
                    itemLength: req.body.allDatalength,
                    checkvideoList: req.body.doc
                })
            });
    },

    onCheckVideoPass: function(videoId) {

        var url = '/video-manage/check';
        request.put(url)
            .set('Content-Type', 'application/json')
            .send({
                videoId: videoId
            })
            .use(errorHandler)
            .end((err, req) => {
              if (err) {
                  console.log(err);
              }
            });
    },

    onGetVideoInfo: function(videoId) {

        var url = '/video-manage/video';
        request.get(url)
            .set('Content-Type', 'application/json')
            .query({
                videoId: videoId
            })
            .use(errorHandler)
            .end((err, req) => {
                this.trigger(req.body)
            });
    },

    onUpdateVideoInfo: function(videodata) {

        var url = '/video-manage/video';

        request.put(url)
            .set('Content-Type', 'application/json')
            .send(videodata)
            .use(errorHandler)
            .end((err, req) => {
                if (err) {
                    console.log(err);
                }
            });
    },

    onDeleteVideoInfo: function(videoId) {

        var url = '/video-manage/video';

        request.delete(url)
            .set('Content-Type', 'application/json')
            .send({
                id: videoId
            })
            .use(errorHandler)
            .end((err, req) => {
                if (err) {
                    console.log(err);
                }
            });
    }

});

module.exports = CheckVideoStore;
