const app = getApp()
const commont = require('../../../utils/commont.js')
const { getHttpRequest: fetch } = require('../../../utils/httputils.js')
const { normalize } = require('../../../utils/util.js')
const methods = {
    getConversationDetail() {
        const req_data = {
            conversationId: this.data.conversation_id
        }
        fetch(commont.getConversationDetailListUrl(), 'post', req_data, true)
            .then(res => {
                this.setData({
                    msg_list: res
                })
            })
    },
    openFinishDialog() {
        this.setData({
            visible_finish: true
        })
    },
    closeFinishDialog() {
        this.setData({
            visible_finish: false
        })
    },
    previewImage(e) {
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls: [current]
        })
    },
    setScore({ detail: { value: new_val } }) {
        this.setData({
            score: new_val
        })
    },
    //结束会话
    finishQuestion() {
        const req_data = {
            id: this.data.conversation_id,
            score: this.data.score
        }
        fetch(commont.getFinsihConversationUrl(), 'put', req_data, true)
            .then(() => {
                wx.showToast({
                    title: app.globalData.local_lang.pages_notify_nofityDetail_index.over_question,
                    icon: 'success',
                    duration: 2000,
                    success() {
                        wx.switchTab({
                            url: '../../index/index'
                        })
                    }
                })
                this.closeFinishDialog()
            })
    },
    //继续提问
    toQuestion() {
        const reqData = {
            id: this.data.conversation_id,
            conversationDetail: {
                createId: app.globalData.serverUserInfo
                    .id,
                createType: 1
            }
        }
        fetch(commont.askQuestionUrl(), 'post', reqData, true)
            .then(({ id, conversationId }) => {
                const params_obj = {
                    id,
                    conversationId,
                    is_expert: !this.data.is_user
                }
                const params = normalize(params_obj)
                wx.navigateTo({
                    url: '../../expert-advice/question-detail/index?' + params
                })
            })
    }
}

Page({
    data: {
      
        local_lang: {},
      
        visible_finish: false,
        score: 4,
        conversation_id: null,
        user_avatar_url: null,
        expert_avatar_url: null,
        is_user: '',
        user_name: '',
        expert_name: '',
        msg_list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      this.setData({
        local_lang: app.globalData.local_lang.pages_notify_nofityDetail_index
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.pages_notify_nofityDetail_index.index_nav_title,
      });
      
        const user_avatar_url = app.globalData.userInfo.avatarUrl
        const user_name = app.globalData.serverUserInfo.name
        this.setData({
            ...options,
            user_name,
            user_avatar_url,
            is_user: !!options.user
        })
    },
    ...methods,
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getConversationDetail()
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