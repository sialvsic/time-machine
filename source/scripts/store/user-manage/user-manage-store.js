'use strict';

var Reflux = require('reflux');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var errorHandler = require('../../../../middleware/error-handler');
var UserManageAction = require('../../actions/user-manage/user-manage-actions');

var UserManageStore = Reflux.createStore({
    listenables: UserManageAction,

    onGetAllUserList: function(type, key, page) {
        var usertype = type || 'all';
        var userkey = key || '';
        var userpage = page || 1;

        var url = '/user-manage';

        request.get(url)
            .set('Content-Type', 'application/json')
            .query({
                type: usertype,
                key: userkey,
                page: userpage
            })
            .use(errorHandler)
            .end((err, req) => {

                this.trigger({
                    itemLength: req.body.allDatalength,
                    userList: req.body.doc
                })
            });
    },

    onGetUserInfo: function(userId) {

        var url = '/user-manage/user';
        request.get(url)
            .set('Content-Type', 'application/json')
            .query({
                userId: userId
            })
            .use(errorHandler)
            .end((err, req) => {
                this.trigger(req.body)
            });
    },

    onUpdateUserInfo: function(userdata) {

        var url = '/user-manage/user';

        request.put(url)
            .set('Content-Type', 'application/json')
            .send(userdata)
            .use(errorHandler)
            .end((err, req) => {
                if (err) {
                    console.log(err);
                }
            });
    },

    onDeleteUserInfo: function(userId) {

        var url = '/user-manage/user';

        request.delete(url)
            .set('Content-Type', 'application/json')
            .send({
                id: userId
            })
            .use(errorHandler)
            .end((err, req) => {
                if (err) {
                    console.log(err);
                }
            });
    },

    onAddUserInfo: function(userdata) {
        var url = '/user-manage/user';
        request.post(url)
            .set('Content-Type', 'application/json')
            .send(userdata)
            .use(errorHandler)
            .end((err, req) => {
                if (err) {
                    console.log(err);
                }
            });
    }

});

module.exports = UserManageStore;
