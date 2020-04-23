// pages/imglist/index.js
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const dateutils = require('../../utils/dateutils');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        urls: [],
        showWeb:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        wx.setNavigationBarTitle({
          title: app.globalData.local_lang.page_imglist_index.nav_title,
        })

        let id = options.id;
        this.setData({
            id: id
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getPicUrls();
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

    getPicUrls: function () {
        let id = this.data.id;
        let that = this;
        httputils.getHttpRequest(commont.getMainPicsBottomUrl(id), "GET", null, true)
            .then(res => {
                if (res) {
                    let showWeb=(res.length == 1 && res[0].type == 4);
                    that.setData({
                        urls: res,
                        showWeb:showWeb
                    });
                }
            }, res => {

            });
    }
})