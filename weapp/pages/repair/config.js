const app = getApp();

module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: app.globalData.local_lang.page_repair_repair.name,
      placeholder: app.globalData.local_lang.page_repair_repair.placeholder
    },
    repair: {
      title: app.globalData.local_lang.page_repair_repair.weixiu_category,
      placeholder: app.globalData.local_lang.page_repair_repair.placeholder
    },
    age: {
      error: true,
      title: app.globalData.local_lang.page_repair_repair.age,
      inputType: 'number',
      placeholder: app.globalData.local_lang.page_repair_repair.placeholder
    },
    place: {
      title: app.globalData.local_lang.page_repair_repair.jiguan,
      placeholder: app.globalData.local_lang.page_repair_repair.placeholder
    },

    tel: {
      error: true,
      title: app.globalData.local_lang.page_repair_repair.telphone,
      inputType: 'number',
      placeholder: app.globalData.local_lang.page_repair_repair.placeholder
    },
    company: {
      title: app.globalData.local_lang.page_repair_repair.company,
      placeholder: app.globalData.local_lang.page_repair_repair.placeholder
    },


    address: {
      title: app.globalData.local_lang.page_repair_repair.address,
      type: 'textarea',
      placeholder: app.globalData.local_lang.page_repair_repair.addressMax
    }
  },
  person:{
    authentitication: {
      title: app.globalData.local_lang.page_repair_repair.auth_level,
      placeholder: app.globalData.local_lang.page_repair_repair.lever_value,
      disabled: true,
    }

  }
};
