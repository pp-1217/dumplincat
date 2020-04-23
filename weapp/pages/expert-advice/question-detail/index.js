// pages/expert-advice/question-detail/index.js
const commont = require('../../../utils/commont.js')
const { getHttpRequest: fetch, getHttpUploadRequest: uploadFile } = require('../../../utils/httputils.js')
const app = getApp()
const methods = {

    /*
    选择上传图片
     */
    chooseAssets() {
        wx.showActionSheet({
            itemList: this.data.sheetList,
            success: ({ tapIndex }) =>
                (tapIndex === 0 ? uploadImage() :
                    tapIndex === 1 ? uploadVideo() :
                    submitCode())
                .then(checkFileLimit)
                .then(submitFile)
                .catch(errorCode => {
                    if (errorCode === 1) {
                        wx.showToast({
                            title: app.globalData.local_lang.page_expertAdvice_questionDetail_index.number_remind,
                            duration: 2000
                        })
                    }
                })
        })
        //choose assets
        const uploadImage = () => new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 10,
                success: (fileInfo) => {
                    const fileList = fileInfo.tempFiles
                    return resolve(fileList)
                }
            })
        })

        const uploadVideo = () => new Promise((resolve, reject) => {
            wx.chooseVideo({
                success: (fileInfo) => {
                    const fileObj = {
                        path: fileInfo.tempFilePath,
                        isVideo: true
                    }
                    const fileList = [fileObj]
                    return resolve(fileList)
                }
            })
        })
        const submitCode = () => {
            const id = this.data.submitData.id
            return fetch(commont.getConversationKeyUrl(id), 'get', null, true)
                .then(res => app.showBigFile(res))
                .then(() => Promise.reject('nothing'))
        }

        //checkLimit
        const checkFileLimit = (fileList) => {
            if (fileList.length + this.data.fileList.length > 6) {
                return Promise.reject(1)
            }
            return fileList
        }

        //dirty
        const submitFile = (fileList) => {
            const id = this.data.submitData.id
            fileList.forEach(file => {
                uploadFile(commont.getConversationFileUrl(id), file.path)
                    .then(id => {
                        file.id = id
                        this.setData({
                            fileList: [...this.data.fileList, file]
                        })
                    })
            })
        }
    },
    /*
    删除文件提示
     */
    alertRemove(e) {
        const index = e.target.dataset.index
        wx.showModal({
            title: app.globalData.local_lang.page_expertAdvice_questionDetail_index.remind,
            content: app.globalData.local_lang.page_expertAdvice_questionDetail_index.cancel_upload,
            success: (res) => {
                if (res.confirm) {
                    const file_id = this.data.fileList[index].id
                    fetch(commont.getDeleteFileUrl(file_id), "DELETE", null, true)
                        .then(res => {
                            const new_file_list = this.data.fileList;
                            new_file_list.splice(index, 1);
                            this.setData({
                                fileList: new_file_list
                            });
                        });
                }
            }
        })
    },
    setContent(e) {
        this.setData({
            'submitData.content': e.detail.value
        })
    },
    submit() {
        const reqData = this.data.submitData
        if (reqData.content.trim() === '') {
            wx.showModal({
                title: app.globalData.local_lang.page_expertAdvice_questionDetail_index.remind,
                content: app.globalData.local_lang.page_expertAdvice_questionDetail_index.ask_content,
                showCancel: false
            })
        }
        fetch(commont.getConversationDetailUrl(), 'post', reqData, true)
            .then(() => {
                wx.navigateBack()
            })
    },
}

Page({
    /**
     * 页面的初始数据
     */
    data: {

      placeholder: '',
      uploadFileTip: '',
      max: '',
      remove: '',
      submit: '',
      sheetList: [],

        fileList: [],
        submitData: {
            content: '',
            createType: 1,
            id: null,
            conversationId: null
        }
    },
    ...methods,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      this.setData({
        placeholder: app.globalData.local_lang.page_expertAdvice_questionDetail_index.placeholder,
        uploadFileTip: app.globalData.local_lang.page_expertAdvice_questionDetail_index.uploadFileTip,
        max: app.globalData.local_lang.page_expertAdvice_questionDetail_index.max,
        remove: app.globalData.local_lang.page_expertAdvice_questionDetail_index.remove,
        submit: app.globalData.local_lang.page_expertAdvice_questionDetail_index.submit,
        sheetList: app.globalData.local_lang.page_expertAdvice_questionDetail_index.sheetList
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_expertAdvice_questionDetail_index.index_nav_title,
      });

        this.setData({
            'submitData.id': options.id,
            'submitData.conversationId': options.conversationId
        })
        if (options.is_expert === 'true') {
            console.log(options.is_expert, 'yes')
            this.setData({
                'submitData.createType': 2
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