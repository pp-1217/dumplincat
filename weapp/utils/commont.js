const debug = false;

const BASB_URL = "https://jinwei.spacle.cn/server/"
//const BASB_URL = 'https://jinwei.spacle.cn/test/'
//const BASB_URL = "http://127.0.0.1:11002"
module.exports = {
    log: function(res) {
        if (debug) {
            console.log(res);
        }
    },
    //完成会话
    getFinsihConversationUrl() {
        return BASB_URL + '/weixin/conversation'
    },
    //获取会话详细信息
    getConversationDetailListUrl() {
        return BASB_URL + '/weixin/conversation/detail/list'
    },
    //用户获取回话列表
    getConversationListUrl(num = 1, size = 10) {
        return BASB_URL + `/weixin/conversation/list/${num}/${size}`
    },
    //发起提问
    askQuestionUrl() {
        return BASB_URL + '/weixin/conversation'
    },
    //获取专家分类
    getExpertCatUrl() {
        return BASB_URL + '/weixin/user/expert/count'
    },
    //获取专家列表
    getExpretListUrl(num = 1, size = 10) {
        return BASB_URL + `/weixin/user/list/${num}/${size}`
    },
    //用户提交问题
    getConversationDetailUrl() {
        return BASB_URL + '/weixin/conversation/detail'
    },
    //获取上传码
    getConversationKeyUrl(id) {
        return BASB_URL + `/weixin/conversation/${id}/key`
    },
    //上传问题描述文件
    getConversationFileUrl(id) {
        return BASB_URL + `/weixin/conversation/upload/${id}`
    },
    createCommentUrl() {
        return BASB_URL + '/weixin/repository/comment'
    },
    getCommentUrl({
        num = 0,
        size = 10
    }) {
        return BASB_URL + `/weixin/repository/comment/list/${num}/${size}`
    },
    getLoginUrl: function() {
        return BASB_URL + "/weixin/login";
    },
    guestInfo: function() {
        return BASB_URL + "/weixin/info";
    },

    getCategoryList: function() {
        return BASB_URL + "/weixin/category/list";
    },

    getAuthenticationUrl: function() {
        return BASB_URL + "/weixin/authentication";
    },

    ///weixin/authentication/upload/{id}
    getAuthenticationUploadUrl: function() {
        return BASB_URL + "/weixin/authentication/upload/";
    },

    getAuthenticationCodeUrl: function() {
        return BASB_URL + "/weixin/authentication/{id}/key";
    },
    getAuthenticationApplyUrl: function() {
        return BASB_URL + "/weixin/authentication";
    },

    getAuthenticationListUrl: function(num, size) {
        return BASB_URL + "/weixin/authentication/list/" + num + "/" + size;
    },
    getAuthenticationStartUrl: function(id) {
        return BASB_URL + "/weixin/authentication/" + id + "/detail";
    },

    getAuthenticationDetailUrl: function() {
        return BASB_URL + "/weixin/authentication/detail";
    },

    getRepositoryUrl: function(category, num, size) {
        return BASB_URL + "/weixin/repository/category/" +
            category + "/" + num + "/" + size;
    },

    getRepositoryCurUrl: function() {
        return BASB_URL + "/weixin/repository/current";
    },
    getRepositoryUploadUrl: function(id) {
        return BASB_URL + "/weixin/repository/upload/" + id;
    },

    getRepositoryCodeUrl: function() {
        return BASB_URL + "/weixin/repository/{id}/key";
    },
    getRepositoryFormUrl: function() {
        return BASB_URL + "/weixin/repository";
    },

    getRepositorypaidUrl: function(id) {
        return BASB_URL + "/weixin/repository/" + id + "/paid";
    },
    getRepositorypayUrl: function(id) {
        return BASB_URL + "/weixin/repository/" + id + "/pay";
    },

    getRepairUrl: function() {
        return BASB_URL + "/weixin/repair";
    },
    getRepairUploadUrl: function() {
        return BASB_URL + "/weixin/repair/upload/";
    },

    getRepairCodeUrl: function() {
        return BASB_URL + "/weixin/repair/{id}/key";
    },
    getRepairListUrl: function(num, size) {
        return BASB_URL + "/weixin/repair/list/" + num + "/" + size;
    },

    getPointUrl: function() {
        return BASB_URL + "/weixin/point";
    },

    getBuyRecordListUrl: function(num, size) {
        return BASB_URL + "/weixin/point/list/" + num + "/" + size;
    },

    getOrderUrl: function(id) {
        return BASB_URL + "/weixin/repair/" + id + "/order";
    },
    getRepaidDetailUrl: function(id) {
        return BASB_URL + "/weixin/repair/" + id + "/detail";
    },

    getRepaidDetailsUrl: function() {
        return BASB_URL + "/weixin/repair/detail";
    },
    getRepairCompleteUrl: function(repairId) {
        return BASB_URL + "/weixin/repair/" + repairId;
    },

    getRepairDetailListUrl: function(id) {
        return BASB_URL + "/weixin/repair/" + id + "/detail/list";
    },
    getRepairDetailUploadUrl: function(id) {
        return BASB_URL + "/weixin/repair/detail/upload/" + id;
    },

    getRepairDetailKeyUrl: function() {
        return BASB_URL + "/weixin/repair/detail/{id}/key";
    },
    getMallListUrl: function(num, size) {
        return BASB_URL + "/weixin/mall/list/" + num + "/" + size;
    },

    getMallNormsListUrl: function(goodsId) {
        return BASB_URL + "/weixin/mall/" + goodsId + "/norms/list";
    },
    getMallOrderListUrl: function(num, size) {
        return BASB_URL + "/weixin/mall/order/list/" + num + "/" + size;
    },

    geMallOrderUrl: function() {
        return BASB_URL + "/weixin/mall/order";
    },
    getSmsAuthUrl: function() {
        return BASB_URL + "/weixin/sms/auth";
    },
    getDeleteFileUrl: function(fileId) {
        return BASB_URL + "/weixin/file/" + fileId;
    },
    getMainPicsTopUrl: function(type) {
        return BASB_URL + "/weixin/activity/" + type;
    },
    getMainPicsBottomUrl: function(id) {
        return BASB_URL + "/weixin/activity/" + id + "/detail";
    },
    getRefreshUserInfoUrl: function() {
        return BASB_URL + "/weixin/current/user";
    },


    //对象数据 格式化 为 字符串数组
    parseCategoryArray: function(source) {
        let result = [];
        if (source) {
            source.forEach((value) => {
                result.push(value.name);
            });
            return result;
        }
        return null;
    },

    getCategoryNameByValue: function(source, value) {
        let result = '';
        source.forEach((val) => {
            if (val.value == value) {
                result = val.name;
            }
        });
        return result;
    },

    getCategoryIndexByValue: function(source, value) {
        for (let i = 0; i < source.length; i++) {
            if (value == source[i].value) {
                return i;
            }
        }
        return 0;
    },
    showMall: function(arr, value) {
        let name = this.getCategoryNameByValue(arr, value);
        return (name && (name == '实等级' || name == '专家组' || name == '管理员'));
    },

    //判断email
    isEmail: function(strEmail) {
        if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
            return true;
        else
            return false;
    }


}
