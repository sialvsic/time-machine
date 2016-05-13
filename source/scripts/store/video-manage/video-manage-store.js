'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var VideoManageAction = require('../../actions/video-manage/video-manage-actions');

var VideoManageStore = Reflux.createStore({
    listenables: VideoManageAction,

    onGetAllVideoList: function(type, key, page) {
        var videotype = type || 'all';
        var videokey = key || '';
        var videopage = page || 1;

        var url = '/video-manage';

        request.get(url)
            .set('Content-Type', 'application/json')
            .query({
                type: videotype,
                key: videokey,
                page: videopage
            })
            .use(errorHandler)
            .end((err, req) => {

                this.trigger({
                    itemLength: req.body.allDatalength,
                    videoList: req.body.doc
                })
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
    },

    onAddVideoInfo: function(videodata) {
        var url = '/video-manage/video';
        request.post(url)
            .set('Content-Type', 'application/json')
            .send(videodata)
            .use(errorHandler)
            .end((err, req) => {
                if (err) {
                    console.log(err);
                }
            });
    }

});

module.exports = VideoManageStore;
