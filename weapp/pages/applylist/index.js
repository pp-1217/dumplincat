// pages/billrecord/index.js
import componentsConfig from './config';

const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const dateutils = require('../../utils/dateutils');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},
        list: componentsConfig,

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
        local_lang: app.globalData.local_lang.page_applylist_index
      })
      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,
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

        httputils.getHttpRequest(commont.getRepairListUrl(page, count), "POST",
            {
                initUserId: id,
                repairStatus: -1
            }, true).then(res => {
            if (res) {
                let data = res.rows;
                let totalPage = res.size;

                data.forEach((currentValue) => {
                    currentValue.showTime =
                      currentValue.initTime;
                        // dateutils.dayFormatDateTime(currentValue.initTime);
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
                wx.stopPullDownRefresh();
            }

        }, res => {
            wx.stopPullDownRefresh();
        });
    },


    onRecordClick: function (e) {
        let index = e.currentTarget.dataset.index;
        app.globalData.repairApplyRecord = this.data.dataTotal[index];
        wx.navigateTo({
            url: '/pages/repair/repair?record=1'
        })
    }

})
