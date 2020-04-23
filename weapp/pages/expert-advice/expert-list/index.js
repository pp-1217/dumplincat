const commont = require('../../../utils/commont.js')
const { normalize, pick } = require('../../../utils/util.js')
const { getHttpRequest: fetch } = require('../../../utils/httputils.js')
const app = getApp()
const methods = {
    consult(e) {
        // 获取用户信息
       wx.getSetting({
           success: res => {
               if (res.authSetting['scope.userInfo']) {
                   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                   wx.getUserInfo({
                       success: res => {
                           // 可以将 res 发送给后台解码出 unionId
                           app.globalData.userInfo = res.userInfo

                           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                           // 所以此处加入 callback 以防止这种情况
                           if (this.userInfoReadyCallback) {
                               this.userInfoReadyCallback(res)
                           }

                           //
                           //app.login().then(res =>{
                               //if(app.globalData.serverUserInfo.id){

                                   const req_data = {
                                       expertId: e.target.dataset.expertid,
                                       createId: app.globalData.serverUserInfo.id
                                   }
                                   //控制提问目标

                           console.log(req_data.expertId,req_data.createId)
                                   if(req_data.createId===req_data.expertId){
                                       return wx.showModal({
                                           title: this.data.local_lang.showModal_title1,
                                           content: this.data.local_lang.question_remind,
                                           showCancel: false,
                                       })
                                   }
                                   const role_self = app.globalData.serverUserInfo.role
                                   if(role_self<3){
                                       return wx.showModal({
                                         title: this.data.local_lang.showModal_title1,
                                         content: this.data.local_lang.showModal_content1,
                                         showCancel: false,
                                         confirmText: this.data.local_lang.showModal_confirmText1
                                       })
                                   }
                                   fetch(commont.askQuestionUrl(), 'post', req_data, true)
                                       .then(res => {
                                           const params = normalize(pick(res, ['id', 'conversationId']))
                                           wx.navigateTo({
                                               url: '../question-detail/index?' + params
                                           })
                                       })

                               //}
                           //})



                       }
                   })
               } else {
                   //未授权,跳转授权界面
                   wx.redirectTo({
                       url: '/pages/authorize/index',
                   });
               }
           },
           fail: res => {
               commont.log("getSetting fial " + JSON.stringify(res));
           }
       });

    },
    incPageNum() {
        this.setData({
            pageNum: this.data.pageNum + 1
        })
        this.getExpretList()
    },
    getExpretList() {
        const reqData = {
            role: 4,
            category: this.data.category
        }
        fetch(commont.getExpretListUrl(this.data.pageNum), 'post', reqData, true)
            .then(({ rows }) => {
                this.setData({
                    'expert_list': [
                        ...this.data.expert_list,
                        ...rows
                    ]
                })
            })
    }
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
      local_lang: {},
        expert_list: [],
        pageNum: 1,
        category: null
    },
    ...methods,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_expertAdvice_expertList_index
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_expertAdvice_expertList_index.index_nav_title,
      });


        console.log(options)
        this.setData(options)
        this.getExpretList()
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
