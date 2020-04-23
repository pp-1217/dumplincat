// pages/repair/repair.js
const config = require('./config');
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const dateutils = require('../../utils/dateutils');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
const Dialog = require('../../dist/dialog/dialog');
const Message = require('../../utils/message');
const DialogScroll = require('../../dist/dialogscroll/dialog');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: app.globalData.local_lang.page_repair_repair,
        config,
        showPopup:false,
        formdata: {},
        canModify: true,
        isBill:false, //接单
        fileLists: [], //type ,url,id

        isRecord: false, //是否为记录详情
        isModifyRecord:false,//不能增加修改记录

        recordList: [],

      busList: [],
      busStrList:[],
      busslectIndex:0,

      categoryStr: app.globalData.local_lang.page_repair_repair.categoryStr,//申请分类,不能修改时
// custom sheet
            show: false,
            cancelWithMask: true,
            actions: [{
              name: app.globalData.local_lang.page_repair_repair.item_1,
              subname: app.globalData.local_lang.page_repair_repair.subitem_1,
                className: 'action-class',
                loading: false
            }, {
                name: app.globalData.local_lang.page_repair_repair.item_2,
                subname: app.globalData.local_lang.page_repair_repair.subitem_2,
                className: 'action-class',
                loading: false
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }, {
                name: app.globalData.local_lang.page_repair_repair.share,
                openType: 'share'
            }],
      cancelText: app.globalData.local_lang.page_repair_repair.close_action,

        showTextArea:true

    },
    onShow: function () {

        Toast.setDefaultOptions({
            selector: '#zan-toast'
        });

    },
    onLoad: function (options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_repair_repair,
        categoryStr: app.globalData.local_lang.page_repair_repair.categoryStr,
        actions: [{
          name: app.globalData.local_lang.page_repair_repair.item_1,
          subname: app.globalData.local_lang.page_repair_repair.subitem_1,
          className: 'action-class',
          loading: false
        }, {
          name: app.globalData.local_lang.page_repair_repair.item_2,
          subname: app.globalData.local_lang.page_repair_repair.subitem_2,
          className: 'action-class',
          loading: false
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }, {
          name: app.globalData.local_lang.page_repair_repair.share,
          openType: 'share'
        }],
        cancelText: app.globalData.local_lang.page_repair_repair.close_action,
      });


      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,
      });

      let busList = app.globalData.busList;
      let busStrList = app.globalData.busStrList;

      if (!busList||busList.length==0){
        this.getCategory();
      }else{
        this.setData({
          busList: busList,
          busStrList: busStrList
        });
      }

      

      Toast.setDefaultOptions({
        selector: '#zan-toast'
      });



        let record = options.record;
        if (record==1){
            this.setData({
                isRecord: true,
                canModify: false,
                isModifyRecord:false
            });
        } else if (record==2){
            this.setData({
                isRecord: true,
                canModify: false,
                isModifyRecord:true
            });
        }else if (record == 3) {//接单
            this.setData({
                isRecord: true,
                canModify: false,
                isBill:true
            });
            wx.setNavigationBarTitle({
              title: this.data.local_lang.nav_title2
            })
        }


        let isRecord = this.data.isRecord;
        let isBill=this.data.isBill;
        if (isRecord) {
            let data = app.globalData.repairApplyRecord;
            this.setData({
                formdata: data,
                fileLists: data.fileUrlList
            });

            this.getRepairRecordList(data.id);
        } else if (isBill){
            let data = app.globalData.repairApplyRecord;
            this.setData({
                formdata: data,
                fileLists: data.fileUrlList
            });
        }

        else {
            this.getRepairApply();
        }
    },
    getRepairApply: function () {
        let that = this;
        httputils.getHttpRequest(commont.getRepairUrl(), "GET", null, true)
            .then(res => {


                that.setData({
                    formdata: res,
                    fileLists: res.fileUrlList
                });
            }, res => {
            });
    },

  //获取分类
  getCategory: function () {
    let that=this;
    httputils.getHttpRequest(commont.getCategoryList(), "POST", {
      code: "bus"
    }, true).then(res => {

      if (res) {
        let strs = commont.parseCategoryArray(res);

        app.globalData.busList = res;
        app.globalData.busStrList = strs;


        that.setData({
          busList: res,
          busStrList: strs
        });

      }

    }, res => {
    });
  },

    //选择方式
    onFileSelectClick: function () {

        let that = this;

        //展示需要上传的类别
        wx.showActionSheet({
            itemList: this.data.local_lang.sheet_list,
            success: function (res) {
                commont.log(res.tapIndex);
                let index = res.tapIndex;
                that.chooseFile(index);
            }, fail: function (res) {
                commont.log(res.tapIndex);
                if (res && res.indexOf('cancel') != -1) {
                    Toast({
                        message: app.globalData.local_lang.page_repair_repair.deselect,
                        selector: '#zan-toast'
                    });
                }

            }
        })
    },

    //三种方式选择文件
    chooseFile: function (index) {
        //只能上传5个
        let list = this.data.fileLists;
        if (list && list.length >= 5) {
            Toptips(app.globalData.local_lang.page_repair_repair.number_warn);
            return;
        }


        let that = this;
        if (index === 0) {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePath = res.tempFilePaths;
                    commont.log("get image " + JSON.stringify(res));
                    // let list = that.data.fileLists;
                    // list.push(tempFilePath[0]);
                    //
                    //
                    // that.setData(
                    //     {fileLists: list}
                    // );

                    that.uploadImgVideo(tempFilePath[0], 2);
                }
            })

        } else if (index === 1) {
            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                camera: 'back',
                success: function (res) {

                    // let list = that.data.fileLists;
                    // list.push(res.tempFilePath);
                    //
                    // commont.log("get video " + res.tempFilePath);
                    // that.setData(
                    //     {fileLists: list}
                    // );

                    that.uploadImgVideo(res.tempFilePath, 1);

                }
            });

        } else if (index === 2) {
            let id = this.data.formdata.id;
            httputils.getHttpRequest(commont.getAuthenticationUrl() + "/" + id +
                "/key", "GET", null, true
            ).then(res => {
                commont.log(app.globalData.local_lang.page_repair_repair.authorize_success + res);
                app.showBigFile(res);
            }, res => {
                Toptips(app.globalData.local_lang.page_repair_repair.authorize_warn);
            });
        }
    },


// /weixin/repair/upload/{id}

    //上传图片 2和视频 1
    uploadImgVideo: function (file, type) {
        let that = this;
        commont.log("upload fils " + JSON.stringify(file));
        if (file) {
            httputils.getHttpUploadRequest(commont.getRepairUploadUrl() + this.data.formdata.id, file)
                .then(res => {
                    commont.log("received " + res);

                    //获取到id，保存

                    let list = that.data.fileLists;
                    let item = {};
                    item.type = type;
                    item.url = file;
                    item.id = res; //成功后返回的
                    list.push(item);
                    that.setData(
                        {fileLists: list}
                    );


                }, res => {
                    Toptips(app.globalData.local_lang.page_repair_repair.upload_fail);
                });

        }
    },

    onFileDeleteClick: function (e) {
        let that = this;
        wx.showModal({
            title: app.globalData.local_lang.page_repair_repair.remind,
            content: app.globalData.local_lang.page_repair_repair.remind_content,
            success: function (res) {
                if (res.confirm) {
                    commont.log('用户点击确定');
                    let index = e.currentTarget.dataset.index;
                    let fileLists = that.data.fileLists;
                    that.deleteImgVideo(fileLists[index].id, index);
                } else if (res.cancel) {
                    commont.log('用户点击取消')
                }
            }
        })


    },

    //删除已上传的文件
    deleteImgVideo: function (fileId, fileIndex) {
        let that = this;
        commont.log("start delete file is " + fileId);
        if (fileId) {
            httputils.getHttpRequest(commont.getDeleteFileUrl(fileId), "DELETE", null, true)
                .then(res => {
                    let fileLists = that.data.fileLists;
                    fileLists.splice(fileIndex, 1);
                    that.setData({
                        fileLists: fileLists
                    });
                }, res => {

                });
        }
    },

    handleZanFieldChange: function (e) {
        let formData = this.data.formdata;

        commont.log("formdata is " + JSON.stringify(formData));

        let key = e.currentTarget.dataset.key;
        let value = e.detail.detail.value;

        if (!value)
            return;

        if (key === "name") {
            formData.name = value;
        } else if (key === "phone") {
            formData.phone = value;
        } else if (key === "company") {
            formData.company = value;
        } else if (key === "address") {
            formData.address = value;
        } else if (key === "category") {
            formData.category = value;
        }

        this.setData({
            formData: formData
        });
    },

  onSelectCategoryClick: function () {

    if (!this.data.canModify){
            return;
        }

    let busList = this.data.busList;
    let busStrList = this.data.busStrList;
    let that = this;

    let actions=new Array();
    busStrList.forEach(value => {
       let item={};
       item.name=value;
        actions.push(item);
    });

    this.setData({
        actions:actions
    });

    this.openActionsheet();

    // wx.showActionSheet({
    //   itemList: busStrList,
    //   success: function (res) {
    //     let index = res.tapIndex;
    //
    //     let formdata = that.data.formdata;
    //
    //
    //     formdata.category =
    //       busList[index].value;
    //     that.setData({
    //       formdata: formdata,
    //         busslectIndex: index
    //     });
    //
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })

  },


    bindTextAreaBlur: function (e) {
        let value = e.detail.value;
        let formData = this.data.formdata;
        formData.initRemark = value;
        this.setData({
            formData: formData
        });
    },


    onCommitClick: function () {

        this.setData({
            showPopup:true
        });

        // DialogScroll({
        //     title: '弹窗',
        //     message: Message.getLoginUrl(),
        //     selector: '#zan-base-dialog',
        //     showCancelButton: true
        // }).then(() => {
        //     console.log('=== dialog resolve ===', 'type: confirm');
        // }).catch(() => {
        //     console.log('=== dialog reject ===', 'type: cancel');
        // });

        // let formData = this.data.formData;
        //
        // if (this.checkFormDataNULL(formData)){
        //     return;
        // }
        //
        // if (formData) {
        //     this.commitAuthentication(formData);
        // }
    },

    checkFormDataNULL:function(formData){
        let result=false;
        if ((!formData.initRemark || formData.initRemark == '')){
            Toptips(app.globalData.local_lang.page_repair_repair.subscribe_info);
            result=true;
        }else if ((!formData.name || formData.name == '')){
            Toptips(app.globalData.local_lang.page_repair_repair.reply_info);
            result=true;
        }else if ((!formData.phone || formData.phone == '')){
            Toptips(app.globalData.local_lang.page_repair_repair.contact_info);
            result=true;
        }else if ((!formData.company || formData.company == '')){
            Toptips(app.globalData.local_lang.page_repair_repair.company_info);
            result=true;
        }else if ((!formData.address || formData.address == '')){
            Toptips(app.globalData.local_lang.page_repair_repair.address_info);
            result=true;
        }else if ((!formData.category || formData.category == '')){
            Toptips(app.globalData.local_lang.page_repair_repair.repair_info);
            result=true;
        }
        return result;
    },

    //提交申请
    commitAuthentication: function (formData) {
      let category=formData.category ;
      if (!category){
        formData.category = this.data.busList[this.data.busslectIndex].value
      }

        httputils.getHttpRequest(commont.getRepairUrl(), "POST", formData, true).then(res => {
            Toast(app.globalData.local_lang.page_repair_repair.success_submit);
            setTimeout(()=>{
                app.goBack();
            },1000);
        }, res => {
            Toptips(app.globalData.local_lang.page_repair_repair.fail_submit);
        });
    },
    //获取维修记录列表
    getRepairRecordList: function (id) {
        let that = this;
        httputils.getHttpRequest(commont.getRepairDetailListUrl(id),
            "GET", null, true).then(res => {
                let data=res;
            if (data) {

                data.forEach((currentValue) => {
                    currentValue.showTime =
                        dateutils.dayParseSplie(currentValue.time);
                });

                that.setData({
                    recordList: data
                });

            }
        }, res => {
            Toptips(app.globalData.local_lang.page_repair_repair.getinfo_fail);
        })
    },

    onRepairFinishClick:function () {
        let id=this.data.formdata.id;
        httputils.getHttpRequest(commont.getRepairCompleteUrl(id),"POST",null,true)
            .then(res=>{
                Toast(app.globalData.local_lang.page_repair_repair.repair_status);
            },res=>{
                Toptips(app.globalData.local_lang.page_repair_repair.setting_status);
            });

    },
    onNewRepairRecordClick:function () {
        let id=this.data.formdata.id;
        wx.navigateTo({
          url: '/pages/repairrecord/index?id='+id,
        })
    },

    openActionsheet:function() {
        this.setData({
            'show': true
        });
    },

    closeActionSheet:function() {
        this.setData({
            'show': false
        });
    },

    clickAction:function({ detail }) {
        // 如果是分享按钮被点击, 不处理关闭
        const { index } = detail;


        // let index = res.tapIndex;

        let formdata = this.data.formdata;

        let busList = this.data.busList;
        formdata.category =
            busList[index].value;
        this.setData({
            formdata: formdata,
            busslectIndex: index,
            categoryStr:busList[index].name
        });
        this.closeActionSheet();





        // if (index === 2) {
        //     return;
        // }
        // this.setData({
        //     [`actions[${index}].loading`]: true
        // });
        // setTimeout(() => {
        //     this.setData({
        //         [`show`]: false,
        //         [`actions[${index}].loading`]: false
        //     });
        // }, 1500);
    },
    onBillClick:function(e) {
        // commont.log(JSON.stringify(e));
        this.setData({
            showPopup:true
        });



        // let data=this.data.formdata;
        //
        // let that=this;
        // that.setData({
        //     showTextArea:false
        // });
        // Dialog({
        //     title: '提示',
        //     message: '你要接收订单吗？',
        //     selector: '#zan-base-dialog',
        //     showCancelButton: true
        // }).then(() => {
        //     commont.log('=== dialog resolve ===', 'type: confirm');
        //     that.applyBill(data.id);
        //     that.setData({
        //         showTextArea:false
        //     });
        // }).catch(() => {
        //     commont.log('=== dialog reject ===', 'type: cancel');
        //     that.setData({
        //         showTextArea:true
        //     });
        // });
    },
    applyBill: function (id) {
        httputils.getHttpRequest(commont.getOrderUrl(id), "POST", null, true)
            .then(res => {
                Toast(app.globalData.local_lang.page_repair_repair.order_success);
                setTimeout(()=>{
                    app.goBack();
                },1000);
            }, res => {
                Toptips(app.globalData.local_lang.page_repair_repair.order_fail);
            });
    },
  onSubmitOk:function(e){
      this.setData({
          showPopup:false
      });

      let isBill=this.data.isBill;
      if (isBill) {
          let data=this.data.formdata;

          let that=this;
          that.setData({
              showTextArea:false
          });
          Dialog({
              title: app.globalData.local_lang.page_repair_repair.remind,
              message: app.globalData.local_lang.page_repair_repair.order_remind,
              selector: '#zan-base-dialog',
              showCancelButton: true
          }).then(() => {
              commont.log('=== dialog resolve ===', 'type: confirm');
              that.applyBill(data.id);
              that.setData({
                  showTextArea:false
              });
          }).catch(() => {
              commont.log('=== dialog reject ===', 'type: cancel');
              that.setData({
                  showTextArea:true
              });
          });
      }else {
          let formData = this.data.formdata;

          if (this.checkFormDataNULL(formData)){
              return;
          }

          if (formData) {
              this.commitAuthentication(formData);
          }
      }


  },
  onSubmitCancle:function(e){
      this.setData({
          showPopup:false
      });
  }
})