// pages/mallparts/mallparts.js
const app = getApp();
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: '',

        currentTab: 0,  //对应样式变化
        scrollTop: 0,  //用作跳转后右侧视图回到顶部
        screenArray: [], //左侧导航栏内容
        screenId: "",  //后台查询需要的字段
        // childrenArray: [], //右侧内容


      loadText: app.globalData.local_lang.page_mallparts_mallparts.no_data,
        //总数据,要显示的数据
        dataTotal: [],
        //总页数
        totalPage: '',
        //当前页数及每页个数
        page: 1,
        count: 20,

        //搜索key
        inputValue: '',
        //是否显示价格
        showMall: false


    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that=this;
        // this.setData({
        //     inputValue: '',
        //     page: 1
        // });
        // this.getCategory();

        let info = app.globalData.serverUserInfo;
        if (info) {
            if (info.showMall) {
              this.setData({
                showMall: true
              });
            }else {
              this.setData({
                showMall: false
              });
            }
        }

        //重新获取角色权限
        httputils.getHttpRequest(commont.getRefreshUserInfoUrl(),"GET",null,true)
            .then(info=>{
                commont.log("refreshServiceUserInfo "+JSON.stringify(info))
              app.globalData.serverUserInfo = info;


                httputils.getHttpRequest(commont.getCategoryList(), "POST", {
                    code: "role"
                }, true).then(res => {
                    if (res) {
                        let categoryList = res;
                        let categoryStrList = commont.parseCategoryArray(res);

                        let showMall = commont.showMall(categoryList, info.role);
                        info.showMall = showMall;

                        app.globalData.serverUserInfo = info;
                      app.globalData.roleList = categoryList;
                      app.globalData.roleStrList = categoryStrList;


                        // if (info&&info.showMall) {
                        //     that.setData({
                        //         showMall: info.showMall
                        //     });
                        // }

                      if (info) {
                        if (info.showMall) {
                          this.setData({
                            showMall: true
                          });
                        }else {
                          this.setData({
                            showMall: false
                          });
                        }
                      }
                    }
                }, res => {
                    commont.log("获取等级清单失败!");
                });
            },res=>{
            });

    },

    onLoad:function(){

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_mallparts_mallparts.nav_title,
      })

      this.setData({
        local_lang: app.globalData.local_lang.page_mallparts_mallparts,
        inputValue: '',
        page: 1
      });
      this.getCategory();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            dataTotal: [],
            page: 1,
            totalPage: 0
        });
        let value = this.data.screenArray[this.data.currentTab].value;
        let inputValue = this.data.inputValue;
        if (inputValue != '') {
            this.getPointDefault(null, inputValue);
        } else if (value) {
            this.getPointDefault(value, null);
        } else {
            wx.stopPullDownRefresh();
        }

    },
    navbarTap: function (e) {
        var that = this;
        let currentTab = e.currentTarget.id;
        this.setData({
            currentTab: currentTab,   //按钮CSS变化
            screenId: e.currentTarget.dataset.screenid,
            scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部

            //复位
            dataTotal: [],
            page: 1,
            //总页数
            totalPage: 0
        })
        //刷新右侧内容的数据
        var screenId = this.data.screenId;
        that.getPointDefault(this.data.screenArray[currentTab].value, null);
    },
    onBuyClick: function (e) {
        let index = e.currentTarget.dataset.index;
        let good = this.data.dataTotal[index];

        app.globalData.useGoods = good;

        wx.navigateTo({
            url: '/pages/malldetail/malldetail?payType=1',
        })
    },


    //获取分类
    getCategory: function () {
        let that = this;
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: "goods"
        }, true).then(res => {
            if (res) {
                app.globalData.goodList = res;
                app.globalData.goodStrList = commont.parseCategoryArray(res);


                that.setData({
                    screenArray: res,
                    dataTotal: [],
                    page: 1,
                    totalPage: 0
                });
                that.getPointDefault(res[0].value, null);
            }
        }, res => {

        });
    },

    getPointDefault: function (category, name) {
        let that = this;
        let page = this.data.page;
        let count = this.data.count;

        httputils.getHttpRequest(commont.getMallListUrl(page, count), "POST", {
            name: name,
            category: category,
            payType: 1,
            sellStatus: 1
        }, true).then(res => {
            if (res) {
                let data = res.rows;
                let totalPage = res.size;


                //第一次
                if (page == 1) {
                    let loadText = '';
                    if (totalPage == 0) {
                        loadText = "暂无数据";
                    }

                    that.setData({
                        dataTotal: data,
                        totalPage: totalPage,
                        page: 2,
                        loadText: loadText
                    });

                } else {//2   3
                    if (page <= totalPage) {
                        let lData = that.data.dataTotal;
                        let page = that.data.page;
                        lData = lData.concat(data);
                        page = page + 1;

                        that.setData({
                            dataTotal: lData,
                            totalPage: totalPage,
                            page: page,
                            loadText: ''
                        });
                    }
                }
                wx.stopPullDownRefresh();
            }

        }, res => {
            wx.stopPullDownRefresh();
        });
    },

    onScrollBottom: function () {
        let thisPage = this.data.page;
        let totalPage = this.data.totalPage;

        let value = this.data.screenArray[this.data.currentTab].value;
        let inputValue = this.data.inputValue;


        if (thisPage <= totalPage) {
            if (inputValue != '') {
                this.getPointDefault(null, inputValue);
            } else if (value) {
                this.getPointDefault(value, null);
            }
        } else {
            commont.log("无更多数据！");
        }
    },
    searchChange: function (e) {
        let searchKey = e.detail.value;
        this.setData({
            inputValue: searchKey
        });
        if (searchKey && searchKey != '') {
            //do search
            this.setData({
                dataTotal: [],
                page: 1,
                totalPage: 0
            });
            let inputValue = this.data.inputValue;
            this.getPointDefault(null, inputValue);
        } else if (searchKey == '') {
            this.setData({
                dataTotal: [],
                page: 1,
                totalPage: 0
            });
            let value = this.data.screenArray[this.data.currentTab].value;
            this.getPointDefault(value, null);
        }
    },
})
