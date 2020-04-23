//index.js
//获取应用实例
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const dateutils = require('../../utils/dateutils');
const app = getApp();

Page({
  data: {
    local_lang: app.globalData.local_lang.page_index_index,
    authNum: 0,
    // bannerUrl: ['../img/banner1.jpg', '../img/banner2.jpg', '../img/banner3.jpg'],
    list: [
      app.globalData.local_lang.page_index_index.renZheng,
      app.globalData.local_lang.page_index_index.kaoHePingJi,
      app.globalData.local_lang.page_index_index.ziLiaoKu
    ],
    imgUrl: ['../img/ic_authentication.png', '../img/ic_ranking.png', '../img/ic_video.png',
      '../img/ic_repaird.png', '../img/ic_vmall.png', '../img/ic_mall.png'],
    list1: [
      app.globalData.local_lang.page_index_index.weixiushenqing,
      app.globalData.local_lang.page_index_index.jifenshangcheng,
      app.globalData.local_lang.page_index_index.shengtaiquan
      ],

    topUrls: [],
    bottomUrls: [],
    showMall: false,
    showBill: false,
    active: 0,

  },
    //事件处理函数
    bindViewTap: function () {

    },
    onLoad: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onShow: function () {

      this.setData({
        local_lang: app.globalData.local_lang.page_index_index,
        list: [
          app.globalData.local_lang.page_index_index.renZheng,
          app.globalData.local_lang.page_index_index.kaoHePingJi,
          app.globalData.local_lang.page_index_index.ziLiaoKu
        ],
        list1: [
          app.globalData.local_lang.page_index_index.weixiushenqing,
          app.globalData.local_lang.page_index_index.jifenshangcheng,
          app.globalData.local_lang.page_index_index.shengtaiquan
        ],
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_index_index.index_nav_title,
      });
      
      app.setUserInfoReadyCallback(this.doOnShow)


    },
    doOnShow(){
        this.getAuth();
        // this.setData({
        //     authNum: app.globalData.authNum
        // });

        let that = this;

        let serverUserInfo = app.globalData.serverUserInfo;
        if (serverUserInfo && serverUserInfo.showMall) {
            that.setData({
                showMall: serverUserInfo.showMall
            });
        }
        // else if (serverUserInfo&&serverUserInfo.role) {
        //     app.getRoleList(serverUserInfo);
        // }
        else {
            app.getAuthority().then(
                res => {
                    commont.log("FFK " + res);
                    if (res) {
                        that.setData({
                            showMall: res,
                            showBill: app.globalData.serverUserInfo.role
                        })
                    }
                },
                res => {
                    commont.log("FFK fsail " + res);
                }
            );
        }


        // let flag=true;
        // let info=app.globalData.serverUserInfo;
        // while (flag) {
        //     if (info){
        //         commont.log("show mall "+info.showMall);
        //         this.setData({
        //             serverUserInfo:info
        //         });
        //         flag=false;
        //     }
        //
        // }

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        clearInterval(this.timeT);
    },
    onReady: function () {
        this.getPics(1);
        this.getPics(2);
    },
    onItemClick1: function (e) {
        let index = e.currentTarget.dataset.index;
        if (index == 2) {
            wx.navigateTo({
                url: '/pages/mallparts/mallparts',
            })
        } else if (index == 0) {
            wx.navigateTo({
                url: '/pages/repair/repair?record=0',
            })
        } else if (index == 1) {
            wx.navigateTo({
                url: '/pages/point/point',
            })
        }
    },
    onItemClick: function (e) {
        let index = e.currentTarget.dataset.index;
        if (index == 2) {
            wx.navigateTo({
                url: '/pages/documenter/documenter',
            })
        } else if (index == 0) {
            wx.navigateTo({
                url: '/pages/authentication/authentication',
            })
        } else if (index == 1) {
            wx.navigateTo({
                url: '/pages/rating/rating',
            })
        }


    },
    EventHandle: function (res) {

    },


    getPics: function (type) {
        let that = this;
        httputils.getHttpRequest(commont.getMainPicsTopUrl(type), "GET", null, true)
            .then(res => {
                if (type == 1) {
                    that.setData({
                        topUrls: res
                    });
                } else if (type == 2) {
                    that.setData({
                        bottomUrls: res
                    });
                }
            }, res => {

            });
    },
    onPicClick: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/imglist/index?id=' + id,
        });
    },
    //获取首页小红点
    getAuth: function () {
        let that = this;

        if (this.timeT) {
            clearInterval(this.timeT);
        }

        app.getBillRankPoint().then(res => {
            commont.log("get red point !" + res);
            that.setData({
                authNum: app.globalData.authNum
            });
        });


        this.timeT = setInterval(() => {
            commont.log("get red point !");
            app.getBillRankPoint().then(res => {
                that.setData({
                    authNum: app.globalData.authNum
                });
            });
        }, 5 * 60 * 1000);


        // httputils.getHttpRequest(commont.getSmsAuthUrl(), "GET", null, true)
        //     .then(res => {
        //         if (res && res.length > 0) {
        //
        //             httputils.getHttpRequest(commont.getSmsAuthUrl(), "POST",
        //                 JSON.parse(JSON.stringify(res).replace('\\',''))
        //                 , true)
        //                 .then(res => {
        //                     app.globalData.authNum = res;
        //                     that.setData({
        //                         authNum: res
        //                     });
        //                 }, res => {
        //
        //                 });
        //         }
        //     }, res => {
        //
        //     });
    },

    // event.detail 的值为当前选中项的索引
    onChange: function (event) {
        let index = event.detail;
        app.onChange(index);
    }


})
