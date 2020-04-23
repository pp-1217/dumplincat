// pages/auditing/auditing.js
var app = getApp();
const config = require('./config');
const commont = require('../../utils/commont');
const Toptips = require('../../dist/toptips/toptips');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},
        config,
        value: '',
        data: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      this.setData({
        local_lang: app.globalData.local_lang.pages_auditing_auditing,
        value: app.globalData.local_lang.pages_auditing_auditing.lever_value
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.pages_auditing_auditing.index_nav_title,
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
        let ratingUser = app.globalData.ratingUser;

        // 测试数据
        /**
        let ratingUser1=
            '{"fileUrlList":' +
            '[' +
            '{"type":1,"url":"https://jwell-1257651156.cos.ap-chengdu.myqcloud.com/-11577930701543989349709-933477904.mp4"},' +
            '{"type":2,"url":"https://jwell-1257651156.cos.ap-chengdu.myqcloud.com/-11577930701543989716008-1631398708_cover.jpg"},'+
            '{"type":3,"url":"111"},'+
            '{"type":4,"url":"111"}' +
            ']}'
        let ratingUser=JSON.parse(ratingUser1)
         **/



        if (ratingUser){
            let list=ratingUser.fileUrlList;
            list.forEach(value=>{
                if (value.type==1||value.type=='1'){
                    value.imgCoverUrl='/pages/img/ic_video.png'
                } else if (value.type==2||value.type=='2'){
                    value.imgCoverUrl=value.url
                }else if (value.type==3||value.type=='3'){
                    value.imgCoverUrl='/pages/img/ic_document.png'
                }else{
                    value.imgCoverUrl='/pages/img/ic_link.png'
                }
            });
        }


        this.setData({
            data: ratingUser
        });
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    onVideoSelected: function (e) {
        let index = e.currentTarget.dataset.index;
      let file = this.data.data.fileUrlList[index];
        if (file.type==2){
            wx.previewImage({
                current: file.url, // 当前显示图片的http链接
                urls: file.url.split("。") // 需要预览的图片http链接列表
            });
        }else if (file.type==1){
            wx.navigateTo({
              url: '/pages/video/index?url='+file.url
            })
        }else if (file.type == 3) {
            //打开文本
            this.openDocument(file.url)
        }else {
            Toptips(app.globalData.local_lang.pages_auditing_auditing.support_remind);
        }
    },

    openDocument:function(url){
        wx.showLoading({
            title: '加载中...',
        });
        wx.downloadFile({
            url: url,
            success: function (res) {
                var filePath = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    success: function (res) {
                        commont.log('打开文档成功')
                    },fail:function (res) {
                        commont.log("open fail "+JSON.stringify(res));
                        Toptips(app.globalData.local_lang.pages_auditing_auditing.file_open);
                    },complete:function (res) {
                        wx.hideLoading()
                    }
                })
            },fail:function (res) {
                commont.log("download fail !" + JSON.stringify(res));
                wx.hideLoading();
                Toptips(app.globalData.local_lang.pages_auditing_auditing.download_status);
            }
        })
    },


  onFileSelect:function(e){
    let url = e.currentTarget.dataset.url;
      wx.showLoading({
          title: '加载中...',
      });
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
              commont.log('打开文档成功')
          },fail:function (res) {
              commont.log("open fail "+JSON.stringify(res));
            },complete:function (res) {
                wx.hideLoading()
            }
        })
      }
    })
  },

    onCommitClick: function () {
        wx.navigateTo({
          url: '/pages/rating2/rating2?authenId=' + this.data.data.id
        })
    },


})