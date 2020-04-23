// pages/me/me.js

import componentsConfig from './config';
const commont = require('../../utils/commont');
let app = getApp();
const httputils = require('../../utils/httputils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},
        serverUserInfo: "",
        list: componentsConfig,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        is_expert: false,
        showBill:false,
        active: 2,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
        this.setData({
          local_lang: app.globalData.local_lang.page_me_me,
          list: componentsConfig
        });

        wx.setNavigationBarTitle({
          title: app.globalData.local_lang.page_me_me.index_nav_title,
        });

        app.setUserInfoReadyCallback(this.doOnShow)

    },
    doOnShow(){
        let that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    success(res) {
                      that.setData({
                        serverUserInfo: res.userInfo
                      });
                    }
                  })
                
                }else{
                    that.setData({
                        serverUserInfo: {
                          nickName: that.data.local_lang.auth,
                            avatarUrl:  "https://static-1256912642.cos.ap-chengdu.myqcloud.com/pm2.0/grey.png"
                        }
                    });

                }

            }
        });
        //表示用户身份状态(专家)
        this.setData({
            is_expert: app.globalData.serverUserInfo.role === 3
        })
        // app.getAuthority().then(
        //     res=>{
        if(app.globalData.serverUserInfo)
            that.setData({
                showBill:app.globalData.serverUserInfo.role
            })
        // },
        // res=>{
        // }
        // );

        app.refreshServiceUserInfo();
    },
    bindGetUserInfo(e) {

        let that=this
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            app.globalData.userInfo = res.userInfo;
                            app.globalData.serverUserInfo.avatarUrl= res.userInfo.avatarUrl;
                            app.globalData.serverUserInfo.nickName= res.userInfo.nickName;
                            that.setData({
                                serverUserInfo: app.globalData.serverUserInfo
                            });
                            httputils.getHttpRequest(commont.guestInfo(), "PUT", res.userInfo,true).then(res => {
                            })
                        }
                    })
                }
            },
            fail: res => {
                commont.log("getSetting fial " + JSON.stringify(res));
            }
        })

    },
    login: function () {

        let that = this;
        //获取token
        let token = wx.getStorageSync('token');
        let userInfo = app.globalData.userInfo;

        if (token && userInfo) {
            httputils.getHttpRequest(commont.getLoginUrl(), "POST", {
                code: token,
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
            }, false).then(res => {
                commont.log("success " + res);
                if (res) {
                    app.globalData.serverUserInfo = res;
                    that.setData({
                        serverUserInfo: app.globalData.serverUserInfo
                    });
                    wx.setStorageSync('userId', res.id);
                }
            }, res => {
                commont.log("fail " + res);
                wx.showToast({
                    title: app.globalData.local_lang.page_me_me.login_info,
                    icon:"none"
                })

            });
        } else {
            commont.log("token or userInfo is null!");
            wx.showToast({
                title: app.globalData.local_lang.page_me_me.authorize_info
            })
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    OnItemClicked: function (e) {
        commont.log(JSON.stringify(e));
        let index = e.currentTarget.dataset.index;
        if (index == 1) {
            this.getBonusPoints();
        }

    },

    getBonusPoints: function () {
       
    },
    onChange:function(event) {
        let index=event.detail;
        app.onChange(index);
    }
})
