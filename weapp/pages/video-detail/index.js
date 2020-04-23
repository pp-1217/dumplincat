// pages/video-detail/index.js
const commont = require('../../utils/commont.js')
const { getHttpRequest: fetch } = require('../../utils/httputils.js')
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: app.globalData.local_lang.page_videoDetail_index,
        videoUrl: '',
        comments: [],
        reqUrlData: {
            num: 1,
            size: 10,
        },
        reqData: {
            docId: null,
            status: null
        },
        reqComment: {
            docId: '',
            content: ''
        }
    },
    incPageNum() {
        this.setData({
            'reqUrlData.num': this.data.reqUrlData.num + 1
        })
        this.getComment()
    },
    setCommentContent(e) {
        const newVal = e.detail.value
        this.setData({
            'reqComment.content': newVal
        })
    },
    createComment() {
        if(this.data.reqComment.content.trim()===''){
            return wx.showModal({
                title: this.data.local_lang.remind,
                content: this.data.local_lang.content,
                showCancel: false,
                confirmText: app.globalData.local_lang.page_videoDetail_index.confirm_text
            })
        }
        fetch(commont.createCommentUrl(), 'post', this.data.reqComment, true)
            .then(res => {
                wx.showModal({
                    title: app.globalData.local_lang.page_videoDetail_index.remind,
                    content: app.globalData.local_lang.page_videoDetail_index.content_submit,
                    showCancel: false,
                    confirmText: app.globalData.local_lang.page_videoDetail_index.confirm_text
                })
                this.setData({
                    'reqComment.content': ''
                })
                this.setData({
                    'reqUrlData.num': 1
                })
                this.setData({
                    comments: []
                })
                this.getComment()
            })
    },
    getComment() {
        return fetch(commont.getCommentUrl(this.data.reqUrlData), 'post', this.data.reqData, true)
            .then(res => {
                this.setData({
                    comments: [
                        ...this.data.comments,
                        ...res.rows
                    ]
                })
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_videoDetail_index
      });
      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_videoDetail_index.index_nav_title,
      });
      
        console.log(options)
        this.setData({
            videoUrl: options.url
        })
        this.setData({
            reqData: {
                docId: options.id,
                status: options.status
            }
        })
        this.setData({
            'reqComment.docId': options.id
        })
        this.getComment()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function(...xs) {},

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
