const app = getApp()
const { getHttpRequest: fetch } = require('../../../utils/httputils.js')
const commont = require('../../../utils/commont.js')
const { normalize } = require('../../../utils/util.js')
const methods = {
    toDetail(e) {
        const params = normalize({ 
            ...e.currentTarget.dataset, 
            ...this.data.role 
        })
        wx.navigateTo({
            url: '../nofity-detail/index?' + params
        })
    },
    getConversationList() {
        fetch(commont.getConversationListUrl(this.data.page_num), 'post', this.data.req_data, true)
            .then(({ rows }) => {
                rows.forEach(row=>{
                    console.log(row)
                })
                this.setData({
                    conversation_list: [...this.data.conversation_list, ...rows]
                })
            })
    },
    incPageNum() {
        this.setData({
            page_num: this.data.page_num + 1
        })
        this.getConversationList()
    }
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},
        req_data: {},
        conversation_list: [],
        page_num: 1,
        role: {} //用户类型:专家/用户
    },
    ...methods,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_notify_nofityList_index
      });

      wx.setNavigationBarTitle({
        title: this.data.local_lang.index_nav_title,
      });

        const id = app.globalData.serverUserInfo.id
        this.setData({ role: options })
        if (options.user) {
            this.setData({
                req_data: {
                    createId: id
                }
            })
        } else {
            this.setData({
                req_data: {
                    expertId: id
                }
            })
        }
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
        this.setData({
            conversation_list: []
        })
        this.getConversationList()
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