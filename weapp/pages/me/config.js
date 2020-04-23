const app = getApp();

export default {
    base: {
        // title: '基础组件',
        content: [{
            name: app.globalData.local_lang.page_me_me.ownInfo,
                path: '/pages/userinfo/userinfo'
            }, 
            {
              name: app.globalData.local_lang.page_me_me.sorce,
                path: '/pages/pointrecord/index'
            }, 
            {
              name: app.globalData.local_lang.page_me_me.weixiujilu,
                path: '/pages/applylist/index'
            },
            {
              name: app.globalData.local_lang.page_me_me.jiedanjilu,
                path: '/pages/billrecord/index'
            }, 
            {
              name: app.globalData.local_lang.page_me_me.jifenduihuanjilu,
                path: '/pages/buylist/index?payType=2'
            }, 
            {
              name: app.globalData.local_lang.page_me_me.shangpinggoumaijilu,
                path: '/pages/buylist/index?payType=1'
            }, 
            {
              name: app.globalData.local_lang.page_me_me.wendajilu,
                path: '/pages/notify/nofity-list/index?user=true',
            }, 
            {
              name: app.globalData.local_lang.page_me_me.zhuanjiaxiaoxi,
                path: '/pages/notify/nofity-list/index?expert=true'
            }
        ]
    }
};