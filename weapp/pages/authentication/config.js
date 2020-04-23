var app = getApp();

module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: app.globalData.local_lang.pages_authentication_authentication.name,
      placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
    },
    sex: {
      focus: true,
      title: app.globalData.local_lang.pages_authentication_authentication.sex,
      placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
    },
    age: {
      error: true,
      title: app.globalData.local_lang.pages_authentication_authentication.age,
      inputType: 'number',
      placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
    },
    place: {
      title: app.globalData.local_lang.pages_authentication_authentication.jiguan,
      placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
    },

    tel: {
      error: true,
      title: app.globalData.local_lang.pages_authentication_authentication.telphone,
      inputType: 'number',
      placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
    },
    company: {
      title: app.globalData.local_lang.pages_authentication_authentication.company,
      placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
    },

      email: {
        title: app.globalData.local_lang.pages_authentication_authentication.email,
        placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
      },
    address: {
      title: app.globalData.local_lang.pages_authentication_authentication.address,
      type: 'textarea',
      placeholder: app.globalData.local_lang.pages_authentication_authentication.addressMax
    },
      category: {
        title: app.globalData.local_lang.pages_authentication_authentication.apply_types,
        placeholder: app.globalData.local_lang.pages_authentication_authentication.placeholder
      }
  }
};
