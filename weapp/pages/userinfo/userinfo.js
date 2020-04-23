// pages/userinfo/userinfo.js
const config = require('./config');
let app = getApp();
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: app.globalData.local_lang.page_userinfo_userinfo,
        config,
        userInfo: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_userinfo_userinfo
      });
      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,
      })
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
        let userInfo = app.globalData.serverUserInfo;


        let levelList = app.globalData.levelList;
        if (levelList.length > 0) {

            let levelName=commont.getCategoryNameByValue(levelList,userInfo.level);
            userInfo.showLevelName=levelName;
            this.setData({
                userInfo: userInfo
            });
        } else {
            this.setData({
                userInfo: userInfo
            });
            this.getCategoryList("level")
        }

        let roleList = app.globalData.roleList;
        if (roleList.length > 0) {

            let roleName=commont.getCategoryNameByValue(roleList,userInfo.role);
            userInfo.showRoleName=roleName;
            this.setData({
                userInfo: userInfo
            });
        } else {
            this.setData({
                userInfo: userInfo
            });
            this.getCategoryList("role")
        }

        let busList = app.globalData.busList;
        if (busList.length > 0) {

            let busName=commont.getCategoryNameByValue(busList,userInfo.category);
            userInfo.showBusName=busName;
            this.setData({
                userInfo: userInfo
            });
        } else {
            this.setData({
                userInfo: userInfo
            });
            this.getCategoryList("bus")
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
    //获取列表清单
    getCategoryList: function (code) {
        let that = this;
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: code
        }, true).then(res => {
            if (res) {
                let categoryList = res;
                let categoryStrList = commont.parseCategoryArray(res);
                let userInfo = that.data.userInfo;
                if (code == 'role') {

                    let roleName=commont.getCategoryNameByValue(categoryList,userInfo.role);
                    userInfo.showRoleName=roleName;
                    this.setData({
                        userInfo: userInfo
                    });

                    app.globalData.roleList = categoryList;
                    app.globalData.roleStrList = categoryStrList;
                } else if (code == 'level') {

                    let levelName=commont.getCategoryNameByValue(categoryList,userInfo.level);
                    userInfo.showLevelName=levelName;
                    this.setData({
                        userInfo: userInfo
                    });

                    app.globalData.levelList = categoryList;
                    app.globalData.levelStrList = categoryStrList;
                }else if (code == 'bus') {

                    let categoryName=commont.getCategoryNameByValue(categoryList,userInfo.category);
                    userInfo.showBusName=categoryName;
                    this.setData({
                        userInfo: userInfo
                    });

                    app.globalData.busList = categoryList;
                    app.globalData.busStrList = categoryStrList;
                }

            }
        }, res => {
            Toptips(app.globalData.local_lang.page_userinfo_userinfo.list_fail);
        });
    }
})