let app = getApp();

module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: app.globalData.local_lang.page_userinfo_userinfo.name,
      placeholder: ''
    },
    comname:{
      title: app.globalData.local_lang.page_userinfo_userinfo.company,
      placeholder: ''
    },
    tel: {
      error: true,
      title: app.globalData.local_lang.page_userinfo_userinfo.telphone,
      inputType: 'number',
      placeholder: ''
    },
    address: {
      title: app.globalData.local_lang.page_userinfo_userinfo.address,
      type: 'textarea',
      placeholder: ''
    },
    level: {
      title: app.globalData.local_lang.page_userinfo_userinfo.level,
      placeholder: ''
    }
  }
};
