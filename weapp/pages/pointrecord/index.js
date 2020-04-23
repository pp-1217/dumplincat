// pages/billrecord/index.js
import componentsConfig from './config';

const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const app = getApp();
const dateutils = require('../../utils/dateutils');

const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
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
        count: 20,

      //我的积分
      bonusPoints:0
    },


    onLoad: function(){

      this.setData({
        local_lang: app.globalData.local_lang.page_pointrecord_index 
      });

      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,
      })
    },

    onShow: function () {
        this.setData({
            dataTotal: [],
            page: 1
        });
        this.getRepairRequestRecord();
      this.getPoint();
    },
    onPullDownRefresh: function () {
        this.setData({
            dataTotal: [],
            page: 1
        });
        this.getPoint();
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
  getPoint:function(){
        let that=this;
httputils.getHttpRequest(commont.getPointUrl(),"GET",null,true)
    .then(res=>{
        that.setData({
            bonusPoints:res
        });
    },reason => {

    });
  },

    getRepairRequestRecord: function () {
        let that = this;
        // let id = app.globalData.serverUserInfo.id;
        let page = this.data.page;
        let count = this.data.count;

        httputils.getHttpRequest(commont.getBuyRecordListUrl(page, count), "POST",
            {}, true).then(res => {
            if (res) {
                let data = res.rows;
                let totalPage = res.size;

                data.forEach((currentValue)=>{



                  currentValue.showTitle = currentValue.reason;

                  let subTitle="";
                  if (currentValue.flowDirection==1){
                    subTitle = this.data.local_lang.subTitle1;
                  }else{
                    subTitle = this.data.local_lang.subTitle2;
                  }
                  currentValue.subTitle = subTitle + currentValue.absoluteValue+app.globalData.local_lang.page_pointrecord_index.integral;

                        // dateutils.dayFormatDateTimeStr(currentValue.opTime);
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

  onBillClick:function(e){
      // let index=e.currentTarget.dataset.index;
      // // let data=this.data.dataTotal;
      // app.globalData.repairApplyRecord = this.data.dataTotal[index];
      // wx.navigateTo({
      //     url: '/pages/repair/repair?record=2'
      // })

  }
})
