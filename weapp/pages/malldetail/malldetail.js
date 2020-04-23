// pages/malldetail/malldetail.js
const app = getApp();
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: app.globalData.local_lang.page_malldetail_malldetail,
        good: {},
        goodSize: [],

        bannerUrl: ['../img/banner1.jpg', '../img/banner2.jpg', '../img/banner3.jpg'],
        types: ['', '', ''],
        payType:'',
      content:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let payType=options.payType;
        if(options.goodsId){
            httputils.getHttpRequest(commont.getMallListUrl(1,0), "POST", {
                id: options.goodsId,
            }, true).then(res => {
                    if (res) {
                        app.globalData.useGoods=res.rows[0]
                        this.setData({
                            good: app.globalData.useGoods,
                            payType:payType
                        });
                        this.getGoodSize();
                        console.log(options,app.globalData.useGoods)
                    }})
        }else {
            let good = app.globalData.useGoods;
            this.setData({
                good: good,
                payType:payType
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

      this.setData({
        local_lang: app.globalData.local_lang.page_malldetail_malldetail,
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_malldetail_malldetail.nav_title,
      });

      this.getGoodSize();
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
        return {
            title: app.globalData.local_lang.page_malldetail_malldetail.nav_title,
            path: '/pages/malldetail/malldetail?goodsId='+this.data.good.id+'&payType='+this.data.payType

        }
    },
    getGoodSize: function () {
        let that = this;
        let id = this.data.good.id;
        httputils.getHttpRequest(commont.getMallNormsListUrl(id), "POST", null, true)
            .then(res => {
                that.setData({
                    goodSize: res
                });
            }, res => {

            });
    },


    onBuyClick: function (e) {
        let index = e.currentTarget.dataset.index;
        let size = this.data.goodSize[index];
        let payType=this.data.payType;

        wx.navigateTo({
            url: '/pages/purchase/purchase?id='
                +size.id+"&price="+size.price
                +"&goodsId="+size.goodsId
            +"&payType="+payType,
        })
    },

    onCommitClick:function (e) {

        let good= app.globalData.useGoods ;
        wx.navigateTo({
          url: '/pages/purchase/purchase?goodsId='
            + good.id + "&price=" + good.priceRange
            // + "&goodsId=" + size.goodsId
            + "&payType=2",
        })

    },
})
