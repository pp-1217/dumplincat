const { getHttpRequest: fetch } = require('../../../utils/httputils.js')
const {normalize} = require('../../../utils/util.js')
const commont = require('../../../utils/commont.js')
const app = getApp()
const methods = {
    getList() {
        wx.showLoading({
            title: app.globalData.local_lang.page_expertAdvice_categoryList_index.loading
        })
        fetch(commont.getExpertCatUrl(), 'get', null, true)
            .then(res=>{
                this.setData({
                    list: res
                })
              setTimeout(function () {
                wx.hideLoading()
              }, 500)
               
            })
    },
    toExpert(e) {
        const params = normalize(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../expert-list/index?'+params
        })
    }
}
// pages/expert-advice/category-list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },
    ...methods,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      
      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_expertAdvice_categoryList_index.index_nav_title,
      });
      
      app.setUserInfoReadyCallback(this.doOnShow)

    },
      doOnShow(){
          this.getList()
      },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
