// pages/uploadtxt/uploadtxt.js
const config = require('./config');
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: app.globalData.local_lang.page_uploadtxt_uploadtxt,
        config,
        fileLists: [],
        formdata: {}, //form 信息


        categoryList: [],
        categoryStrList: [],
        categoryselectIndex: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
          local_lang: app.globalData.local_lang.page_uploadtxt_uploadtxt
        });
        wx.setNavigationBarTitle({
          title: this.data.local_lang.nav_title,
        })

        let categoryList = app.globalData.categoryList;
        let categoryStrList = app.globalData.categoryStrList;
        this.setData({
            categoryList: categoryList,
            categoryStrList: categoryStrList
        });

        Toast.setDefaultOptions({
            selector: '#zan-toast'
        });

        this.getDefaultList();
    },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      categoryselectIndex: e.detail.value
    })
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

    },
    onSelectCategoryClick: function() {

            let categoryList = this.data.categoryList;
            let categoryStrList = this.data.categoryStrList;
            let that = this;

            wx.showActionSheet({
                itemList: categoryStrList,
                success: function(res) {
                    let index = res.tapIndex;

                    let formdata = that.data.formdata;
                    formdata.category =
                        categoryList[index].value;
                    that.setData({
                        formdata: formdata,
                        categoryselectIndex: index
                    });

                },
                fail: function(res) {
                    commont.log(res.errMsg)
                }
            })

        }

        ,
    getDefaultList: function() {
        let that = this;
        httputils.getHttpRequest(commont.getRepositoryCurUrl(),
                "GET", null, true)
            .then(res => {

                that.setData({
                    formdata: res,
                    categoryselectIndex: commont.getCategoryIndexByValue(this.data.categoryList, res.category)

                });
            }, res => {
                Toptips(app.globalData.local_lang.page_uploadtxt_uploadtxt.data_fail);
            });
    },

    handleZanFieldChange: function(e) {
        commont.log("handleZanFieldChange " + JSON.stringify(e));

        let formData = this.data.formdata;

        commont.log("formdata is " + JSON.stringify(formData));

        let key = e.currentTarget.dataset.key;
        let value = e.detail.detail.value;

        if (!value)
            return;

        if (key === "name") {
            formData.name = value;
        } else if (key === "price") {
            formData.price = value;
        }

        this.setData({
            formData: formData
        });
    },

    onCommitClick: function() {
        let formData = this.data.formData;

        let value = this.data.categoryList[this.data.categoryselectIndex].value;

        formData.category = value;

        if (formData) {
            this.commitAuthentication(formData);
        }
    },


    //选择方式
    onFileSelectClick: function() {

        let that = this;

        let url = this.data.formdata.url;
        if (url) {
            wx.showModal({
                title: app.globalData.local_lang.page_uploadtxt_uploadtxt.remind,
                content: app.globalData.local_lang.page_uploadtxt_uploadtxt.content,
                success: function(res) {
                    if (res.confirm) {
                        commont.log('用户点击确定')
                        that.showChoose();
                    } else if (res.cancel) {
                        commont.log('用户点击取消')
                    }
                }
            });

        } else {
            that.showChoose();
        }

    },

    showChoose: function() {
        let that = this;
        //展示需要上传的类别
        wx.showActionSheet({
            itemList: [app.globalData.local_lang.page_uploadtxt_uploadtxt.video, app.globalData.local_lang.page_uploadtxt_uploadtxt.text],
            success: function(res) {
                commont.log(res.tapIndex);
                let index = res.tapIndex;
                that.chooseFile(index);
            },
            fail: function(res) {
                commont.log(res.tapIndex);
                if (res && res.indexOf('cancel') != -1) {
                    Toast({
                        message: app.globalData.local_lang.page_uploadtxt_uploadtxt.cancel_choose,
                        selector: '#zan-toast'
                    });
                }

            }
        })
    },

    //三种方式选择文件
    chooseFile: function(index) {
        //只能上传5个
        let list = this.data.fileLists;
        if (list && list.length >= 5) {
            Toptips(app.globalData.local_lang.page_uploadtxt_uploadtxt.number_info);
            return;
        }


        let that = this;
        if (index === 0) {
            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                camera: 'back',
                success: function(res) {
                    that.uploadImgVideo(res.tempFilePath, 1);
                }
            });

        } else if (index === 1) {
            let id = this.data.formdata.id;
            httputils.getHttpRequest(commont.getRepositoryFormUrl() + "/" + id +
                "/key", "GET", null, true
            ).then(res => {
                commont.log('获取上传码成功' + res);
                app.showBigFile(res);
            }, res => {
                Toptips(app.globalData.local_lang.page_uploadtxt_uploadtxt.code_fail);
            });
        }
    },

    //上传图片 0和视频 1
    uploadImgVideo: function(file, type) {
        let that = this;
        commont.log("upload fils " + JSON.stringify(file));
        if (file) {
            wx.showLoading({
                title: app.globalData.local_lang.page_uploadtxt_uploadtxt.loading,
            });
            httputils.getHttpUploadRequest(
                    commont.getRepositoryUploadUrl(this.data.formdata.id), file)
                .then(res => {
                    //获取到id，保存
                    let list = that.data.fileLists;
                    let item = {};
                    item.type = type;
                    item.url = file;
                    item.id = res; //成功后返回的
                    list.push(item);
                    that.setData({ fileLists: list });
                    wx.hideLoading()
                    Toast(app.globalData.local_lang.page_uploadtxt_uploadtxt.upload_success);
                }, res => {
                    wx.hideLoading()
                    Toptips(app.globalData.local_lang.page_uploadtxt_uploadtxt.upload_fail);
                });

        }
    },

    onFileDeleteClick: function(e) {
        let index = e.currentTarget.dataset.index;
        let fileLists = this.data.fileLists;

        let fileId = fileLists[index].id;
        this.deleteImgVideo(fileId, index);
    },

    //删除已上传的文件
    deleteImgVideo: function(fileId, fileIndex) {
        let that = this;
        commont.log("start delete file is " + fileId);
        if (fileId) {
            httputils.getHttpRequest(commont.getDeleteFileUrl(fileId), "DELETE", null, true)
                .then(res => {
                    let fileLists = that.data.fileLists;
                    fileLists.splice(fileIndex, 1);
                    that.setData({
                        fileLists: fileLists
                    });
                }, res => {

                });
        }
    },

    commitAuthentication: function(formData) {
        httputils.getHttpRequest(commont.getRepositoryFormUrl(),
            "POST", formData, true).then(res => {
            Toast(app.globalData.local_lang.page_uploadtxt_uploadtxt.submit_success);
            setTimeout(() => {
                app.goBack();
            }, 1000);
        }, res => {
            Toptips(app.globalData.local_lang.page_uploadtxt_uploadtxt.submit_fail);
        });
    },

    onSelectPointClick: function() {
        let that = this;
        wx.showActionSheet({
            itemList: app.globalData.local_lang.page_uploadtxt_uploadtxt.sroce_list,
            success: function(res) {
                let index = res.tapIndex;

                let price = index * 1;

                let formdata = that.data.formdata;
                formdata.price = price;

                that.setData({
                    formdata: formdata
                });

            },
            fail: function(res) {
                commont.log(res.errMsg)
            }
        })
    }


})