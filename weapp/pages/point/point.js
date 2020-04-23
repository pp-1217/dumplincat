// pages/point/point.js
const Dialog = require('../../dist/dialog/dialog');
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        local_lang: {},
        title: '',
        unit: '',

        bonusPoints: 0,

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
        local_lang: app.globalData.local_lang.page_point_point,
        title: app.globalData.local_lang.page_point_point.title,
        unit: app.globalData.local_lang.page_point_point.unit,
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_point_point.index_nav_title,
      });
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
            dataTotal: [],
            page: 1,
            totalPage: 0
        });
        this.getPoint();

        this.getPointDefault();
    },

    getPoint:function(){
        let that=this;
        httputils.getHttpRequest(commont.getPointUrl(),"GET",null,true)
            .then(res=>{
                that.setData({
                    bonusPoints:res
                });
            },reason => {
                let bonusPoints = app.globalData.serverUserInfo.bonusPoints;
                this.setData({
                    bonusPoints: bonusPoints
                });

            });
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
            page: 1,
            totalPage: 0
        });
        this.getPointDefault();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let thisPage = this.data.page;
        let totalPage = this.data.totalPage;
        if (thisPage <= totalPage) {
            this.getPointDefault();
        } else {
            commont.log("无更多数据！");
        }
    },
    onExchangeClicked: function (e) {
        let index = e.currentTarget.dataset.index;

        let good = this.data.dataTotal[index];

        let that = this;

        // Dialog({
        //   title:'是否兑换',
        //   message: '将扣除'+good.priceRange+'积分',
        //   selector: '#zan-no-title-dialog',
        //   showCancelButton:'true',
        //   confirmButtonColor:'#D0021B',
        //   cancelButtonColor: '#D0021B'
        // }).then(() => {
        //   console.log('=== dialog ===', 'type: confirm');
        that.orderPoint(good);
        // }).catch(() => {
        //   console.log('=== dialog reject ===', 'type: cancel');
        // });
    },

    getPointDefault: function () {
        let that = this;
        let page = this.data.page;
        let count = this.data.count;

        httputils.getHttpRequest(commont.getMallListUrl(page, count), "POST", {
            category: "-1",
            payType: 2,
            sellStatus:1
        }, true).then(res => {
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
            } else {
                commont.log("no data");
            }
        }, res => {
            wx.stopPullDownRefresh();
        });
    },


    orderPoint: function (good) {
        //填写表单

        app.globalData.useGoods = good;

        wx.navigateTo({
            url: '/pages/malldetail/malldetail?payType=2',
        });

    }
})
