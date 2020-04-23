const app = getApp();

module.exports = {
    // 基础类型输入框配置
    base: {
        name: {
          title: app.globalData.local_lang.page_repairrecord_index.process_result,
          placeholder: app.globalData.local_lang.page_repairrecord_index.placeholder
        },
        address: {
          title: app.globalData.local_lang.page_repairrecord_index.explain,
            type: 'textarea',
          placeholder: app.globalData.local_lang.page_repairrecord_index.explain_max
        }
    }
};
