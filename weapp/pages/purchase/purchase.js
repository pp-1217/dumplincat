// pages/purchase/purchase.js
const config = require('./config');
const app = getApp();
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
      config,
      sumbit: '',
      data: {},
      local_lang: {}
    },

//     goodsId：商品ID
// goodsDetailId：商品规格ID
// price：单价
// size：商品数量
// total：订单总额
// connectMan：联系人
// company：公司
// address：地址
// phone：联系电话
// remark：备注
// advicer：推荐人
// payType：支付方式 1：货币2：

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
          sumbit: app.globalData.local_lang.page_purchase_purchase.sumbit,
          local_lang: app.globalData.local_lang.page_purchase_purchase
        });

        let id = options.id;
        let price = options.price;
        let goodsId = options.goodsId;
        let payType=options.payType;

        if (payType==2){
            wx.setNavigationBarTitle({
              title: app.globalData.local_lang.page_purchase_purchase.index_nav_title1
            })
        } else {
            wx.setNavigationBarTitle({
              title: app.globalData.local_lang.page_purchase_purchase.index_nav_title2
            })
        }


        let data={};
        data.goodsDetailId=id;
        data.price=price;
        data.goodsId=goodsId;
        data.payType=payType;
        data.size=1;
        //推荐人默认自己
        let advicer=app.globalData.serverUserInfo.name;
        data.advicer=advicer;

        this.setData({
            data:data
        });

      Toast.setDefaultOptions({
        selector: '#zan-toast'
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
    handleZanFieldChange:function(e){
        let data=this.data.data;

        let key = e.currentTarget.dataset.key;
        let value = e.detail.detail.value;

        if (!value)
            return;
        if (key === "size") {
            data.size=value;
        }else if (key === "connectMan") {
            data.connectMan=value;
        }else if (key === "company") {
            data.company=value;
        }else if (key === "address") {
            data.address=value;
        }else if (key === "phone") {
            data.phone=value;
        }else if (key === "advicer") {
            data.advicer=value;
        } else if (key === "remark") {
          data.remark = value;
        }

        this.setData({
            data:data
        });

    },

    buyGood:function () {
        let orderGood=this.data.data;
        if(!orderGood.size||orderGood.size==''){
            Toast(app.globalData.local_lang.page_purchase_purchase.number_remind);
            return;
        }else if(!orderGood.connectMan||orderGood.connectMan==''){
            Toast(app.globalData.local_lang.page_purchase_purchase.contact_remind);
            return;
        }else if (!orderGood.company||orderGood.company=='') {
            Toast(app.globalData.local_lang.page_purchase_purchase.company_remind);
            return;
        }else if (!orderGood.address||orderGood.address=='') {
            Toast(app.globalData.local_lang.page_purchase_purchase.address_remind);
            return;
        }else if (!orderGood.phone||orderGood.phone=='') {
            Toast(app.globalData.local_lang.page_purchase_purchase.phone_remind);
            return;
        }
        // else if (!orderGood.advicer||orderGood.advicer=='') {
        //     Toast("请输入推荐人！");
        //     return;
        // }

      // orderGood.size = 1;
      orderGood.total = orderGood.price*orderGood.size;

        httputils.getHttpRequest(commont.geMallOrderUrl(),"POST",orderGood,true)
            .then(res=>{
              Toast(app.globalData.local_lang.page_purchase_purchase.success_remind);
                setTimeout(()=>{
                    app.goBack();
                },1000);
            },res=>{
              Toptips(app.globalData.local_lang.page_purchase_purchase.fail_remind);
            });
    }
})
