const app = getApp();

module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: app.globalData.local_lang.page_uploadtxt_uploadtxt.title,
      placeholder: app.globalData.local_lang.page_uploadtxt_uploadtxt.placeholder
    },
    tel: {
      error: true,
      title: app.globalData.local_lang.page_uploadtxt_uploadtxt.need_score,
      disabled: true
    },
    address: {
      title: app.globalData.local_lang.page_uploadtxt_uploadtxt.classification,
      disabled: true
    }
  }
};
