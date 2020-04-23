var app = getApp();

module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: app.globalData.local_lang.pages_auditing_auditing.name,
      placeholder: app.globalData.local_lang.pages_auditing_auditing.placeholder
    },
    sex: {
      focus: true,
      title: app.globalData.local_lang.pages_auditing_auditing.sex,
      placeholder: app.globalData.local_lang.pages_auditing_auditing.placeholder
    },
    age: {
      error: true,
      title: app.globalData.local_lang.pages_auditing_auditing.age,
      inputType: 'number',
      placeholder: app.globalData.local_lang.pages_auditing_auditing.placeholder
    },
    place: {
      title: app.globalData.local_lang.pages_auditing_auditing.jiguan,
      placeholder: app.globalData.local_lang.pages_auditing_auditing.placeholder
    },

    tel: {
      error: true,
      title: app.globalData.local_lang.pages_auditing_auditing.telphone,
      inputType: 'number',
      placeholder: app.globalData.local_lang.pages_auditing_auditing.placeholder
    },
    company: {
      title: app.globalData.local_lang.pages_auditing_auditing.company,
      placeholder: app.globalData.local_lang.pages_auditing_auditing.placeholder
    },


    address: {
      title: app.globalData.local_lang.pages_auditing_auditing.address,
      type: 'textarea',
      placeholder: app.globalData.local_lang.pages_auditing_auditing.addressMax
    }
  },
  person:{
    authentitication: {
      title: app.globalData.local_lang.pages_auditing_auditing.auth_level,
      placeholder: app.globalData.local_lang.pages_auditing_auditing.lever_value,
      disabled: true,
    }

  }
};
