// pages/video/index.js
let app = getApp();
Page({
  data: {
    local_lang: app.globalData.local_lang.page_video_index,
    url:''
  },
  onLoad: function (options) {

    this.setData({
      local_lang: app.globalData.local_lang.page_video_index
    });
    wx.setNavigationBarTitle({
      title: this.data.local_lang.nav_title,
    })

     let url=options.url;
     if(url){
       this.setData({
         url:url
       });
     }
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  }
})