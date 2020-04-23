const app = getApp();

module.exports = {
  // 基础类型输入框配置
  base: {
    size: {
      focus: true,
      title: app.globalData.local_lang.page_purchase_purchase.number,
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    },
    name: {
      focus: true,
      title: app.globalData.local_lang.page_purchase_purchase.contacts,
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    },
    comname: {
      title: app.globalData.local_lang.page_purchase_purchase.companyName,
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    },
    tel: {
      error: true,
      title: app.globalData.local_lang.page_purchase_purchase.telphone,
      inputType: 'number',
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    },
    address: {
      title: app.globalData.local_lang.page_purchase_purchase.address,
      type: 'textarea',
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    },
    level: {
      title: app.globalData.local_lang.page_purchase_purchase.level,
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    },
    remark: {
      title: app.globalData.local_lang.page_purchase_purchase.remarks,
      placeholder: app.globalData.local_lang.page_purchase_purchase.input
    }
  }
};
