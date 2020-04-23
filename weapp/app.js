//app.js
const commont = require('./utils/commont');
const httputils = require('./utils/httputils');
import T from './utils/i18n'; 


App({
    onLaunch: function() {
      
      let that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    commont.log(JSON.stringify(res));
                    wx.setStorageSync('token', res.code)
                    //获取token
                        httputils.getHttpRequest(commont.getLoginUrl(), "POST", {
                            code: res.code,
                        },).then(res => {
                            that.globalData.serverUserInfo = res;
                            wx.setStorageSync('userId', res.id);
                         
                            that.doUserInfoReadyCallback();
                        }, res => {
                            commont.log("fail " + res);
                        });
                }

            }
        });
        /*// 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }

                            //
                            that.login();
                        }
                    })
                } else {
                    //未授权,跳转授权界面
                    wx.redirectTo({
                        url: '/pages/authorize/index?from=launch',
                    });
                }
            },
            fail: res => {
                commont.log("getSetting fial " + JSON.stringify(res));
            }
        });*/
    },

    onShow: function() {

      T.handleLang(this);
    },


    //登录流程
    login: function() {
        let that = this;
            //获取token
            let token = wx.getStorageSync('token');
            let userInfo = that.globalData.userInfo;

            if (token && userInfo) {
                httputils.getHttpRequest(commont.getLoginUrl(), "POST", {
                    code: token,
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl
                }, false).then(res => {
                    commont.log("success " + res);
                    that.globalData.serverUserInfo = res;
                    wx.setStorageSync('userId', res.id);
                    commont.log("get user id is " + res.id + " , " + res.showMall);
                    that.getRoleList(res);
                    // that.getCategory();
                    // that.getAuth();
                }, res => {
                    commont.log("fail " + res);
                    wx.showToast({
                        title: '登录失败!',
                        icon: 'none',
                        duration: 3000
                    });
                });
            } else {
                commont.log("token or userInfo is null!");
            }
    },
    doUserInfoReadyCallback() {
            if (this.userInfoReadyCallback)
                this.userInfoReadyCallback();

    },
    setUserInfoReadyCallback: function( callback) {
        let that = this;
        that.userInfoReadyCallback = callback;
        if (that.checkLoginStatus()) {
            //已经登陆完成
            that.doUserInfoReadyCallback();
        }
    },
    /**
     * 用户信息是否加载完成
     * @returns {boolean}
     */
    checkLoginStatus() {
        return this.globalData.serverUserInfo.id ? true : false;
    },
    //获取分类
    getCategory: function() {
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: "repository"
        }, true).then(res => {}, res => {});
    },

    getAuthority: function() {
        let that = this;
        return new Promise(function(resolve, reject) {
            let time = 0;
            let t = setInterval(() => {
                time++;
                let info = that.globalData.serverUserInfo;
                if (info && that.globalData.roleList.length > 0) {

                    resolve(info.showMall)
                    clearInterval(t);
                }

                if (time > 100) {
                    reject(false);
                    clearInterval(t);
                }

            }, 200);
        })
    },

    showBigFile: function(code) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: '上传码',
                content: '你的上传码为' + code + ",请登录https://www.shengchanren.com/upload/index.html,填写上传码进行上传！",
                success: function(res) {
                    if (res.confirm) {
                        commont.log('用户点击确定')
                    } else if (res.cancel) {
                        commont.log('用户点击取消')
                    }
                    resolve()
                }
            })
        })
    },

    //获取首页小红点
    getAuth: function() {
        let that = this;
        httputils.getHttpRequest(commont.getSmsAuthUrl(), "GET", null, true)
            .then(res => {
                that.globalData.authNum = res
            }, res => {

            });
    },

    //获取等级列表清单
    getRoleList: function(info) {
        let that = this;
        httputils.getHttpRequest(commont.getCategoryList(), "POST", {
            code: "role"
        }, true).then(res => {
            if (res) {
                let categoryList = res;
                let categoryStrList = commont.parseCategoryArray(res);

                let showMall = commont.showMall(categoryList, info.role);
                info.showMall = showMall;

                that.globalData.serverUserInfo = info;
                that.globalData.roleList = categoryList;
                that.globalData.roleStrList = categoryStrList;


            }
        }, res => {
            commont.log("获取等级清单失败!");
        });
    },

    //获取接单及等级评定
    getBillRankPoint: function() {
        let that = this;
        return new Promise(function(resolve, reject) {
            let serverUserInfo = that.globalData.serverUserInfo;


            //bill
            httputils.getHttpRequest(commont.getRepairListUrl(1, 1), "POST", {
                repairStatus: 1,
                role: serverUserInfo.role,
                level: serverUserInfo.level,
                category: serverUserInfo.category
            }, true).then(res => {
                if (res) {
                    let total = res.total;
                    if (total > 0) {
                        wx.setTabBarBadge({
                            index: 1,
                            text: total.toString()
                        })
                    } else if (total == 0) {
                        // wx.setTabBarBadge({
                        //     index: 1,
                        //     text: ''
                        // })
                        wx.removeTabBarBadge({
                            index: 1
                        })
                    } else {
                        wx.removeTabBarBadge({
                            index: 1
                        })

                    }
                } else {
                    wx.removeTabBarBadge({
                        index: 1
                    })
                }
            }, res => {
                wx.removeTabBarBadge({
                    index: 1
                })
            });


            //评分
            httputils.getHttpRequest(
                commont.getAuthenticationListUrl(1, 1),
                "POST", {
                    reviewCategory: serverUserInfo.category,
                    reviewRole: serverUserInfo.role,
                    reviewLevel: serverUserInfo.level,
                    // status: 2
                    status: 0
                }, true).then(res => {
                if (res) {
                    let total = res.total;
                    if (total >= 0) {
                        that.globalData.authNum = total;
                        resolve(total);
                    }
                }
                resolve(-1);
            }, res => {
                resolve(-1);
            });



        });


    },

    refreshServiceUserInfo: function() {
        let that = this;
        httputils.getHttpRequest(commont.getRefreshUserInfoUrl(), "GET", null, true)
            .then(res => {
                commont.log("refreshServiceUserInfo " + JSON.stringify(res))
                that.globalData.serverUserInfo = res;

                commont.log("get user id is " + res.id + " , " + res.showMall);

                that.getRoleList(res);
            }, res => {});
    },

    goBack: function() {
        wx.navigateBack({});
    },

    onChange: function(index) {
        commont.log("tab " + index)
        if (index == 0) {
            wx.redirectTo({
                url: "/pages/index/index"
            });
        } else if (index == 1) {
            wx.redirectTo({
                url: "/pages/bill/bill"
            });
        } else if (index == 2) {
            wx.redirectTo({
                url: "/pages/me/me"
            });
        }
    },

    globalData: {
       
        local_lang: Object,
        lang_type: '',
        //当前用户信息
        userInfo: {},
        //服务端用户信息
        serverUserInfo: {
            nickName: "点击授权",
            avatarUrl:  "https://static-1256912642.cos.ap-chengdu.myqcloud.com/pm2.0/grey.png"
        },

        ratingUser: {}, //当前等级评定用户

        useGoods: {}, //预够买的商品

        repairApplyRecord: {}, //查看的申请详情

        busList: [], //维修分类
        busStrList: [], //管材、中空、型材。。。

        categoryList: [], //视频分类
        categoryStrList: [],

        goodList: [], //商品分类
        goodStrList: [],

        levelList: [], //等级分类
        levelStrList: [],

        roleList: [], //角色分类
        roleStrList: [],


        authNum: 0 //首页小红点
    }
})
