// pages/buylist/index.js
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const dateutils = require('../../utils/dateutils');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},
        goodList:[],
        goodStrList:[],
        goodSelIndex:0,

        goodBuyTypeList: [],
        goodBuyTypeIndex:0,

        startTime:'',
        endTime:'',


        loadText: '',
        //总数据,要显示的数据
        dataTotal: [],
        //总页数
        totalPage: '',
        //当前页数及每页个数
        page: 1,
        count: 20
    },
    
    onShow: function () {
        this.setData({
            dataTotal: [],
            page: 1
        });
        this.getRepairRequestRecord();
    },
    onLoad: function (options) {

        this.setData({
          local_lang: app.globalData.local_lang.page_buylist_index,
          goodBuyTypeList: app.globalData.local_lang.page_buylist_index.goodBuyTypeList,
        })

        wx.setNavigationBarTitle({
          title: this.data.local_lang.nav_title,
        })

        Toast.setDefaultOptions({
            selector: '#zan-toast'
        });


        // let goodList=app.globalData.goodList;
        // let goodStrList=app.globalData.goodStrList;
        // if (!goodList||goodList.length<=0){
        //     this.getCategory();
        // } else {
        //     this.setData({
        //         goodList:goodList,
        //         goodStrList:goodStrList
        //     });
        // }

        let payType=options.payType;

        this.setData({
            startTime:dateutils.parseNowDay(),
            endTime:dateutils.parseNowDay(),
            payType:payType
        });

    },
    onPullDownRefresh: function () {
        this.setData({
            dataTotal: [],
            page: 1
        });
        this.getRepairRequestRecord();
    },
    onReachBottom: function () {
        let thisPage = this.data.page;
        let totalPage = this.data.totalPage;
        if (thisPage <= totalPage) {
            this.getRepairRequestRecord();
        } else {
            commont.log("无更多数据！");
        }

    },

    getRepairRequestRecord: function () {
        let that = this;
        let id = app.globalData.serverUserInfo.id;
        let page = this.data.page;
        let count = this.data.count;

        let startTime=this.data.startTime;
        let endTime=this.data.endTime;
        let payType=this.data.payType;
        let goodList=this.data.goodList;
        let goodSelIndex=this.data.goodSelIndex;




        httputils.getHttpRequest(commont.getMallOrderListUrl(page, count),
            "POST",
            {
                category: -1,
                payType: parseInt(payType)
                // createTimePre: startTime,
                // createTimeSuf: endTime
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
            }

        }, res => {
            wx.stopPullDownRefresh();
        });
    },

    onRecordClick: function (e) {
        let index = e.currentTarget.dataset.index;
        app.globalData.repairApplyRecord = this.data.dataTotal[index];
        // wx.navigateTo({
        //     url: '/pages/repair/repair?record=1'
        // })
    },


    //获取分类
    getCategory: function () {
        let that = this;
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: "goods"
        }, true).then(res => {
            if (res) {
                app.globalData.goodList=res;
                app.globalData.goodStrList=commont.parseCategoryArray(res);


                that.setData({
                    goodList: res,
                    goodStrList:app.globalData.goodStrList,
                    dataTotal: [],
                    page: 1,
                    totalPage: 0
                });
                that.getPointDefault(res[0].value);
            }
        }, res => {

        });
    },

    onSelCategoryClick: function () {
        let that=this;
        let goodStrList=app.globalData.goodStrList;
        wx.showActionSheet({
            itemList: goodStrList,
            success: function (res) {
                let index=res.tapIndex;
                that.setData({
                    goodSelIndex:index
                });
                },
            fail: function (res) {
            }
        })
    }, onSelBuyClick: function () {
        let that=this;
        let goodBuyTypeList=app.globalData.goodBuyTypeList;
        wx.showActionSheet({
            itemList: goodBuyTypeList,
            success: function (res) {
                let index=res.tapIndex;
                that.setData({
                    goodBuyTypeIndex:index
                });
            },
            fail: function (res) {
            }
        })
    }, onStartTimeChanged: function ({ detail: { value, date } }) {
        let endTime=this.data.endTime;
        if (value&&value.length==3){
            let time=value[0] + '/' + value[1] + '/' + value[2];
            if (dateutils.compareTime(endTime, time)) {
                this.setData({
                    startTime:time
                });
            }else {
                Toptips(local_lang.date_remind);
            }
        }
    }, onEndTimeCancel: function () {

    },onStartTimeChanged: function ({ detail: { value, date } }) {
        let startTime=this.data.startTime;
        if (value&&value.length==3){
            let time=value[0] + '/' + value[1] + '/' + value[2];

            if (dateutils.compareTime(time, startTime)) {
                this.setData({
                    endTime:time
                });
            }else {
                Toptips(local_lang.date_remind);
            }
        }
    }, onEndTimeCancel: function () {

    },
})
