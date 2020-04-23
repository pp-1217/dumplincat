// pages/repairrecord/index.js
import componentsConfig from './config';

const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const app = getApp();
const dateutils = require('../../utils/dateutils');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
//需要增加维修图片
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: componentsConfig,
        loadText: '',
        //总数据,要显示的数据
        dataTotal: [],
        repairId:1,
        local_lang: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let repairId=options.id;
        this.setData({
            repairId:repairId,
            local_lang: app.globalData.local_lang.page_buylist_index
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
        this.getRepairRecord();
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
        this.getRepairRecord();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    getRepairRecord:function () {
        let repairId=this.data.repairId;
        let that=this;
        httputils.getHttpRequest(commont.getRepairDetailListUrl(repairId),
            "GET",null,true).then(res=>{
if (res) {

    res.forEach((currentValue)=>{
        currentValue.showTime=
            dateutils.dayFormatDateTime(currentValue.time);
    });

    that.setData({
        dataTotal:res,
        loadText:(res.length==0?'暂无数据':'')
    });
}
        },res=>{
            Toptips(app.globalData.local_lang.page_buylist_index.data_status);
            that.setData({
                loadText: app.globalData.local_lang.page_buylist_index.status_remind
            });
        });
    }

})