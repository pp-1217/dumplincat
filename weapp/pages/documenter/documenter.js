// pages/documenter/documenter.js
import componentsConfig from './config';
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const app = getApp();
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},
        tab: {},
        textlist: componentsConfig,
        tabSelectedId: 1,
        categoryList: [],
        categoryStrList: [],
        categoryIndex: 0,
      loadText: '',
        //总数据,要显示的数据
        dataTotal: [],
        //总页数
        totalPage: '',
        //当前页数及每页个数
        page: 1,
        count: 20,
        preIndex: -1,
        currIndex: -1,
        //搜索的关键字
        inputValue: '',
        iconSuffix: ['/pages/img/icon_doc.png', '/pages/img/icon_pdf.png',
            '/pages/img/icon_xls.png', '/pages/img/icon_unknown.png'
        ],
        show: false,
        cancelWithMask: true,
        actions: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_documenter_documenter,
        tab: {
          list: [{
            id: 1,
            title: app.globalData.local_lang.page_documenter_documenter.video_item
          }, {
            id: 3,
            title: app.globalData.local_lang.page_documenter_documenter.book_item
          }],
          selectedId: 1
        },
        loadText: app.globalData.local_lang.page_documenter_documenter.nodata
      });

      wx.setNavigationBarTitle({
        title: app.globalData.local_lang.page_documenter_documenter.index_nav_title,
      });

        // let categoryList = app.globalData.categoryList;
        // this.setData({
        //     categoryList: categoryList
        // });
        Toast.setDefaultOptions({
            selector: '#zan-toast'
        });
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
        let categoryList = app.globalData.categoryList;
        this.setData({
            dataTotal: [],
            page: 1
        });

        if (categoryList && categoryList.length > 0) {


            let all = {};
            all.value = -1;
            all.name = this.data.local_lang.all;

            let ncategoryList = categoryList.slice(0);

            ncategoryList.unshift(all);
            let categoryStrList = commont.parseCategoryArray(ncategoryList);
            this.setData({
                categoryList: ncategoryList,
                categoryStrList: categoryStrList
            });

            this.getVideo(-1);
        } else {
            this.getCategoryList();
        }


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
        this.setData({
            dataTotal: [],
            page: 1
        });
        let categoryIndex = this.data.categoryIndex;
        let categoryList = this.data.categoryList;

        this.getVideo(categoryList[categoryIndex].value);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        let thisPage = this.data.page;
        let totalPage = this.data.totalPage;

        let categoryIndex = this.data.categoryIndex;
        let categoryList = this.data.categoryList;

        if (thisPage <= totalPage) {
            this.getVideo(categoryList[categoryIndex].value);
        } else {
            commont.log("无更多数据！");
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    handleTabChange: function(selectedId) {
        // selectId 表示被选中 tab 项的 id  target.currentTarget.detail

        // console.log(JSON.stringify(selectedId));
        this.setData({
            tabSelectedId: selectedId.detail,
            inputValue: '',
            dataTotal: [],
            page: 1
        });

        let categoryIndex = this.data.categoryIndex;
        let categoryList = this.data.categoryList;

        this.getVideo(categoryList[categoryIndex].value);
    },

    onClassSelcted: function() {
        let that = this;
        let categoryList = this.data.categoryList;
        let categoryStrList = this.data.categoryStrList;

        let actions = new Array();
        categoryStrList.forEach(value => {
            let item = {};
            item.name = value;
            actions.push(item);
        });

        this.setData({
            actions: actions
        });


        this.openActionsheet();

        /**
          wx.showActionSheet({
              itemList: categoryStrList,
              success: function (res) {
                  let categoryIndex = res.tapIndex;

                  that.setData({
                      categoryIndex: categoryIndex,
                      page: 1
                  });

                  that.getVideo(categoryList[categoryIndex].value);


              },
              fail: function (res) {

              }
          })
         **/
    },

    openActionsheet: function() {
        this.setData({
            'show': true
        });
    },

    closeActionSheet: function() {
        this.setData({
            'show': false
        });
    },
    clickAction: function({ detail }) {
        // 如果是分享按钮被点击, 不处理关闭
        const { index } = detail;


        // let index = res.tapIndex;

        // let formdata = this.data.formdata;
        //
        // let busList = this.data.busList;
        // formdata.category =
        //   busList[index].value;
        // this.setData({
        //   formdata: formdata,
        //   busslectIndex: index,
        //   categoryStr:busList[index].name
        // });

        let categoryList = this.data.categoryList;
        let categoryIndex = index;
        this.setData({
            categoryIndex: categoryIndex,
            page: 1
        })

        this.getVideo(categoryList[categoryIndex].value);
        this.closeActionSheet();
    },



    //只有已认证用户可以上传
    onUploadClick: function() {
        let serverUserInfo = app.globalData.serverUserInfo;
        if (serverUserInfo && (serverUserInfo.level != -1 || serverUserInfo.role != -1 || serverUserInfo.category != -1)) {
            wx.navigateTo({
                url: '/pages/uploadtxt/uploadtxt',
            })
        } else {
            Toptips(app.globalData.local_lang.page_documenter_documenter.upload_remind);
        }


    },

    getVideo: function(value) {
        let that = this;
        // let categorySelected = this.data.category[this.data.categoryIndex];
        let page = this.data.page;
        let count = this.data.count;

        let type = this.data.tabSelectedId;
        let name = this.data.inputValue;
        let iconSuffix = this.data.iconSuffix;

        httputils.getHttpRequest(commont.getRepositoryUrl(value,
                    page, count),
                "POST", {
                    type: type,
                    name: name
                }, true)
            .then(res => {
                if (res) {
                    let data = res.rows;
                    let totalPage = res.size;

                    // iconSuffix: ['/pages/img/icon_doc.png', '/pages/img/icon_pdf.png',
                    //   '/pages/img/icon_xls.png', '/pages/img/icon_unknown.png']

                    data.forEach((value) => {
                        value.playUrl = '';
                        value.needPoint = (value.price > 0);
                        value.showCover = true;

                        let suffix = value.suffix;
                        if (suffix == 'doc') {
                            value.showSuffix = iconSuffix[0];
                        } else if (suffix == 'pdf') {
                            value.showSuffix = iconSuffix[1];
                        } else if (suffix == 'xls') {
                            value.showSuffix = iconSuffix[2];
                        } else {
                            value.showSuffix = iconSuffix[3];
                        }

                    });

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

                    } else { //2   3
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

    uploadVideo: function() {
        httputils.getHttpRequest(commont.getRepositoryCurUrl(), "GET", null, true)
            .then(res => {

            }, res => {

            });
    },

    checkPaid: function(id, index, videoId, isVideo) {
        let that = this;
        let data = that.data.dataTotal;

        return httputils.getHttpRequest(commont.getRepositorypaidUrl(id),
                "GET", null, true)
            .then(res => {

                if (res && res == true) {

                    let content = app.globalData.local_lang.page_documenter_documenter.e-book_remind;
                    if (!isVideo) {
                        content = app.globalData.local_lang.page_documenter_documenter.video_remind;
                    }
                    return new Promise((resolve, reject) => {
                        wx.showModal({
                            title: app.globalData.local_lang.page_documenter_documenter.remind,
                            content: content,
                            success: function(res) {
                                if (res.confirm) {
                                    commont.log('用户点击确定')
                                    return that.payPoint(id, index, videoId, isVideo);
                                } else if (res.cancel) {
                                    commont.log('用户点击取消')
                                    reject()
                                }
                            }
                        })
                    })

                } else {

                    // data[index].playUrl = data[index].url;
                    data[index].needPoint = false;

                    that.setData({
                        dataTotal: data
                    });

                    if (isVideo) {
                        return Promise.resolve(true)
                    } else {
                        that.openDocument(videoId)
                        return Promise.reject()
                    }

                }

            }, res => {
                Toptips(app.globalData.local_lang.page_documenter_documenter.info_remind);
            });
    },

    payPoint: function(id, index, videoId, isVideo) {
        let that = this;
        let data = that.data.dataTotal;

        return httputils.getHttpRequest(commont.getRepositorypayUrl(id), "POST", null,
                true)
            .then(res => {
                Toast(app.globalData.local_lang.page_documenter_documenter.paysuccess_info);
                data[index].needPoint = false;
                that.setData({
                    dataTotal: data
                });
                if (isVideo) {
                    return Promise.resolve(true);
                }
                that.openDocument(videoId);
                return Promise.reject()

            }, res => {
                Toptips(app.globalData.local_lang.page_documenter_documenter.payfailed_info + res);
            });
    },
    toVideoDetail(e) {
        const reqData = e.currentTarget.dataset
        const params = Object.keys(reqData).map(key => {
            const val = reqData[key]
            return `${key}=${val}`
        }).join('&')

        let index = e.currentTarget.dataset.index;
        let id = this.data.dataTotal[index].id;
        let videoId = 'myVideo-' + index;
        this.checkPaid(id, index, videoId, true)
            .then(() => {
                wx.navigateTo({
                    url: '../video-detail/index?' + params
                })
            })
            .catch(()=>{
                console.log('nothing')
            })
    },
    //获取列表清单
    getCategoryList: function() {
        let that = this;
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: "repository"
        }, true).then(res => {
            if (res) {
                let categoryList = res;
                let categoryStrList = commont.parseCategoryArray(res);

                app.globalData.categoryList = categoryList;
                app.globalData.categoryStrList = categoryStrList;

                let all = {};
                all.value = -1;
                all.name = this.data.local_lang.all;
                let ncategoryList = categoryList.slice(0);

                ncategoryList.unshift(all);
                let ncategoryStrList = commont.parseCategoryArray(ncategoryList);

                that.setData({
                    categoryIndex: 0,
                    categoryList: ncategoryList, //原始数据
                    categoryStrList: ncategoryStrList
                });




                that.getVideo(ncategoryList[0].value);
            }
        }, res => {
            Toptips(app.globalData.local_lang.page_documenter_documenter.getlistfailed);
        });
    },
    openDocument: function(url) {
        wx.showLoading({
            title: app.globalData.local_lang.page_documenter_documenter.loading,
        });
        wx.downloadFile({
            url: url,
            success: function(res) {
                var filePath = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    success: function(res) {
                        commont.log('打开文档成功')
                    },
                    fail: function(res) {
                        commont.log("open fail " + JSON.stringify(res));
                        Toptips(app.globalData.local_lang.page_documenter_documenter.openfilefailed);
                    },
                    complete: function(res) {
                        wx.hideLoading()
                    }
                })
            },
            fail: function(res) {
                commont.log("download fail !" + JSON.stringify(res));
                wx.hideLoading();
                Toptips(app.globalData.local_lang.page_documenter_documenter.downloadfilefailed);
            }
        })
    },

    searchChange: function(e) {
        let searchKey = e.detail.value;
        this.setData({
            inputValue: searchKey,
            dataTotal: [],
            page: 1
        });
        let categoryList = app.globalData.categoryList;
        if (categoryList && categoryList.length > 0) {
            this.getVideo(categoryList[0].value);
        }

    },
    onOpenFile: function(e) {
        let index = e.currentTarget.dataset.index;
        let id = this.data.dataTotal[index].id;
        let videoId = e.currentTarget.dataset.url;
        this.checkPaid(id, index, videoId, false);
    }
})