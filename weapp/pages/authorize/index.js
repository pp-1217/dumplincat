// pages/authorize/index.js
var app = getApp();
const httputils = require('../../utils/httputils');
const commont = require('../../utils/commont');
const Toptips = require('../../dist/toptips/toptips');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      local_lang: {},
      from: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
          local_lang: app.globalData.local_lang.page_authorize_index
        });
        wx.setNavigationBarTitle({
          title: this.data.local_lang.nav_title,
        })

        let from = options.from;
        if (from) {
            this.setData({
                from: from
            });
        }
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
  bindGetUserInfo: function (e) {
       /* if (!e.detail.userInfo) {
            return;
        }

        let userInfo = e.detail.userInfo;
        app.globalData.userInfo = userInfo;

        commont.log("XXX " + JSON.stringify(e));*/
      let that=this
      wx.getSetting({
          success(res) {
              if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                      success(res) {
                          console.log(res.userInfo)
                          app.globalData.userInfo = res.userInfo;
                          app.globalData.serverUserInfo.avatarUrl= res.userInfo.avatarUrl;
                          app.globalData.serverUserInfo.nickName= res.userInfo.nickName;
                          httputils.getHttpRequest(commont.guestInfo(), "PUT", res.userInfo,true).then(res => {
                              let fromStr = that.data.from;
                              if (fromStr === "launch") {
                                  wx.reLaunch({
                                      url: '/pages/index/index',
                                  });
                              }else{
                                  wx.navigateBack();
                              }
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
                    let fromStr = that.data.from;
                    wx.setStorageSync('userId', res.id);
                    if (fromStr === "launch") {
                        wx.reLaunch({
                            url: '/pages/index/index',
                        });
                    }else{
                      wx.navigateBack({

                      });
                    }
                }
            }, res => {
                commont.log("fail " + res);
                Toptips(app.globalData.local_lang.page_authorize_index.login_remind);
            });
        } else {
            commont.log("token or userInfo is null!");
            Toptips(app.globalData.local_lang.page_authorize_index.authorize_remind);
        }
    }
})
