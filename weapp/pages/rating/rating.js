// pages/rating/rating.js
var app = getApp();
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: '',
        loadText: '',
        //总数据,要显示的数据
        dataTotal: [],
        //总页数
        totalPage: '',
        //当前页数及每页个数
        page: 1,
        count: 20
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_rating_rating,
        loadText: app.globalData.local_lang.page_rating_rating.no_data,
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
        this.setData({
            page: 1,
            count: 20
        });
        this.getRatingList();
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
        this.setData({
            dataTotal: [],
            page: 1
        });
        this.getRatingList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let thisPage = this.data.page;
        let totalPage = this.data.totalPage;
        if (thisPage <= totalPage) {
            this.getRatingList();
        } else {
            commont.log("无更多数据！");
        }
    },

    handleTap: function (e) {
        commont.log("select id is "+JSON.stringify(e));
        let index=e.currentTarget.dataset.index;

        let data=this.data.dataTotal;

        app.globalData.ratingUser=data[index];

        wx.navigateTo({
            url: '/pages/auditing/auditing',
        })
    },

    getRatingList: function () {
        let that = this;
        let page = this.data.page;
        let count = this.data.count;

        let userInfo = app.globalData.serverUserInfo;
        httputils.getHttpRequest(
            commont.getAuthenticationListUrl(page, count),
            "POST", {
                reviewCategory: userInfo.category,
                reviewRole: userInfo.role,
                reviewLevel: userInfo.level,
                // status: 2
                // status: 0
            }, true).then(res => {

            commont.log("get rating user " + JSON.stringify(res));

            if (res) {
                let data = res.rows;
                let totalPage = res.size;

                //第一次
                if (page == 1) {
                    let loadText = '';
                    if (totalPage == 0) {
                        loadText = "暂无数据";
                    }

                    that.setData({
                        dataTotal: data,
                        totalPage: totalPage,
                        page: 2,
                        loadText: loadText
                    });

                } else {//2   3
                    if (page <= totalPage) {
                        let lData = that.data.dataTotal;
                        let page = that.data.page;
                        lData = lData.concat(data);
                        page = page + 1;

                        that.setData({
                            dataTotal: lData,
                            totalPage: totalPage,
                            page: page,
                            loadText: ''
                        });
                    }
                }
                wx.stopPullDownRefresh();


            }



        }, res => {
            wx.stopPullDownRefresh();
        });

    }
})
