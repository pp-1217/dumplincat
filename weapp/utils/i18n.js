// /utils/i18n.js
function handleLang(app){

  // 获取设置的语言处理国际化,
  let lang = wx.getSystemInfoSync().language;

  let app_lang = app.globalData.lang_type;
  if(app_lang == '' || app_lang != lang){

    // console.log("需要切换语言");
    //系统语言为英文时，获取英文配置文件
    if ('en' == lang) {
      let localList = require("../language/en-locales.js")
      // console.log("localList: ", localList);

      app.globalData.local_lang = localList.localList;

      //存储对应的语言类型
      app.globalData.lang_type = lang;

    } else {
      //获取中文配置文件
      let localList = require("../language/zh-locales.js")
      // console.log("localList: ", localList);

      app.globalData.local_lang = localList.localList;

      //存储对应的语言类型
      app.globalData.lang_type = lang;
    }

    //动态设置tabbar的文字
    wx.setTabBarItem({
      "index": 0,
      "text": app.globalData.local_lang.tabar.tabar_1
    });

    wx.setTabBarItem({
      "index": 1,
      "text": app.globalData.local_lang.tabar.tabar_2
    });

    wx.setTabBarItem({
      "index": 2,
      "text": app.globalData.local_lang.tabar.tabar_3
    });

    wx.setTabBarItem({
      "index": 3,
      "text": app.globalData.local_lang.tabar.tabar_4
    });
  }
}

module.exports = {
  handleLang: handleLang
}
