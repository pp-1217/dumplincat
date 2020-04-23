// pages/bill/bill.js
const Dialog = require('../../dist/dialog/dialog');
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const dateutils = require('../../utils/dateutils');
const app = getApp();

const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        local_lang: {},

        bills: ['', '', ''],

        loadText: '',
        //总数据,要显示的数据
        dataTotal: [],
        //总页数
        totalPage: '',
        //当前页数及每页个数
        page: 1,
        count: 20,

        showBill:false,
        active: 1,

        busList: [],
        busStrList: []
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
        local_lang: app.globalData.local_lang.page_bill_bill
      });

      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,
      });
            
      app.setUserInfoReadyCallback(this.doOnShow)

    },
    doOnShow(){
        Toast.setDefaultOptions({
            selector: '#zan-toast'
        });


        let busList = app.globalData.busList;
        let busStrList = app.globalData.busStrList;

        this.setData({
            //总数据,要显示的数据
            dataTotal: [],
            //总页数
            totalPage: '',
            //当前页数及每页个数
            page: 1,
        });

        if (!busList||busList.length==0){
            this.getCategory();
        }else{
            this.setData({
                busList: busList,
                busStrList: busStrList
            });
            this.getRepairRequest();
        }


        let that=this;

        // app.getAuthority().then(
        //     res=>{
        if(app.globalData.serverUserInfo)
            that.setData({
                showBill:app.globalData.serverUserInfo.role
            })
        //     },
        //     res=>{
        //     }
        // );
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
        this.getRepairRequest();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let thisPage = this.data.page;
        let totalPage = this.data.totalPage;
        if (thisPage <= totalPage) {
            this.getRepairRequest();
        } else {
            commont.log("无更多数据！");
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onBillClick:function(e) {
        // commont.log(JSON.stringify(e));

        let data=this.data.dataTotal;
        let index=e.currentTarget.dataset.index;


        let that=this;
        Dialog({
            title: app.globalData.local_lang.page_bill_bill.title,
            message: app.globalData.local_lang.page_bill_bill.order_remind,
            selector: '#zan-base-dialog',
            showCancelButton: true
        }).then(() => {
            commont.log('=== dialog resolve ===', 'type: confirm');
            that.applyBill(data[index].id);
        }).catch(() => {
            commont.log('=== dialog reject ===', 'type: cancel');
        });
    },
//获取所有
    getRepairRequest: function () {
        let serverUserInfo = app.globalData.serverUserInfo;

        let that = this;
        let id = app.globalData.serverUserInfo.id;
        let page = this.data.page;
        let count = this.data.count;
        let busList=this.data.busList;

        httputils.getHttpRequest(commont.getRepairListUrl(page, count), "POST",
            {
                repairStatus: 1,
                role: serverUserInfo.role,
                level: serverUserInfo.level,
                category:serverUserInfo.category
            }, true).then(res => {
            if (res) {
                let data = res.rows;
                let totalPage = res.size;

                data.forEach((currentValue)=>{
                    currentValue.showTime=
                        dateutils.dayParse(currentValue.releaseTime);
                    currentValue.categoryStr=
                    commont.getCategoryNameByValue(busList,currentValue.category);
                });

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
                wx.hideLoading()
                wx.stopPullDownRefresh();
            }
        }, res => {
            wx.stopPullDownRefresh();
        });
    },

    applyBill: function (id) {
        httputils.getHttpRequest(commont.getOrderUrl(id), "POST", null, true)
            .then(res => {
                Toast(app.globalData.local_lang.page_bill_bill.success_status);
            }, res => {
                Toptips(app.globalData.local_lang.page_bill_bill.fail_status);
            });
    },onChange:function(event) {
        let index=event.detail;
        app.onChange(index);
    },
    //获取分类
    getCategory: function () {
        let that=this;
        wx.showLoading({
            title:'加载中'
        })
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: "bus"
        }, true).then(res => {

            if (res) {
                let strs = commont.parseCategoryArray(res);

                app.globalData.busList = res;
                app.globalData.busStrList = strs;


                that.setData({
                    busList: res,
                    busStrList: strs
                });

            }
            that.getRepairRequest();

        }, res => {
            that.getRepairRequest();
        });
    },

    onBillClick:function (e) {
        let index=e.currentTarget.dataset.index;
        // let data=this.data.dataTotal;
        app.globalData.repairApplyRecord = this.data.dataTotal[index];
        wx.navigateTo({
            url: '/pages/repair/repair?record=3'
        })
    }
})
