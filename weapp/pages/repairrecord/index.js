// pages/repairrecord/index.js
const config = require('./config');
const commont = require('../../utils/commont');
const httputils = require('../../utils/httputils');
const app = getApp();
const dateutils = require('../../utils/dateutils');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');
//需要增加维修图片
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
      local_lang: app.globalData.local_lang.page_repairrecord_index,
      config,
      repairId: '',
      formdata: {},
      canModify: true,
      fileLists: [], //type ,url,id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.setData({
        local_lang: app.globalData.local_lang.page_repairrecord_index
      });
      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,
      })

      let id = options.id;
      this.setData({
          repairId: id
      });

      Toast.setDefaultOptions({
          selector: '#zan-toast'
      });

      this.getNewRepairRecord(id);
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
    onSelectResClick:function(){
        let that = this;

        //展示需要上传的类别
        wx.showActionSheet({
          itemList: this.data.local_lang.sheet_1,
            success: function (res) {
                commont.log(res.tapIndex);
                let index = res.tapIndex;
                let showRes=(index == 0?'已解决':'未解决');
                let formData = that.data.formdata;
                formData.showRes=showRes;
                formData.res=(index+1);

                that.setData({
                    formdata:formData
                });
            }, fail: function (res) {
                commont.log(res.tapIndex);
                if (res && res.indexOf('cancel') != -1) {
                    Toast({
                        message: app.globalData.local_lang.page_repairrecord_index.cancel_choose,
                        selector: '#zan-toast'
                    });
                }

            }
        })


    },

    handleZanFieldChange:function(e){
        let formData = this.data.formdata;

        commont.log("formdata is " + JSON.stringify(formData));

        let value = e.detail.detail.value;
        if (value) {
            let formData = this.data.formdata;
            formData.remark=value;

            this.setData({
                formData:formData
            });
        }

    },
    onCommitClick:function(){
      let that=this;
      //获取经纬度
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                commont.log("location is "+JSON.stringify(res));

                let latitude = res.latitude
                let longitude = res.longitude

                let formData = that.data.formdata;

                formData.placeX=latitude;
                formData.placeY=longitude;


                if (formData) {
                    that.commitAuthentication(formData);
                }
            },fail:function (res) {
                Toptips(app.globalData.local_lang.page_repairrecord_index.location_info);
            }
        })

    },
    onFileSelectClick:function(){
        let that = this;

        //展示需要上传的类别
        wx.showActionSheet({
          itemList: this.data.local_lang.sheet_2,
            success: function (res) {
                commont.log(res.tapIndex);
                let index = res.tapIndex;
                that.chooseFile(index);
            }, fail: function (res) {
                commont.log(res.tapIndex);
                if (res && res.indexOf('cancel') != -1) {
                    Toast({
                      message: this.data.local_lang.cancle,
                        selector: '#zan-toast'
                    });
                }

            }
        })

    },
    onFileDeleteClick:function(e){
        let that = this;
        wx.showModal({
            title: this.data.local_lang.tip,
            content: this.data.local_lang.delete_tip,
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


    //三种方式选择文件
    chooseFile: function (index) {
        //只能上传5个
        let list = this.data.fileLists;
        if (list && list.length >= 5) {
            Toptips(app.globalData.local_lang.page_repairrecord_index.number_info);
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
                    that.uploadImgVideo(tempFilePath[0], 2);
                }
            })

        } else if (index === 1) {
            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                camera: 'back',
                success: function (res) {

                    that.uploadImgVideo(res.tempFilePath, 1);

                }
            });

        } else if (index === 2) {
            let id = this.data.authenticationData.id;
            httputils.getHttpRequest(commont.getRepaidDetailsUrl() + "/" + id +
                "/key", "GET", null, true
            ).then(res => {
                commont.log(app.globalData.local_lang.page_repairrecord_index.code_success + res);
                app.showBigFile(res);
            }, res => {
                Toptips(app.globalData.local_lang.page_repairrecord_index.code_fail);
            });
        }
    },


    //上传图片 2和视频 1
    uploadImgVideo: function (file, type) {
        let that = this;
        commont.log("upload fils " + JSON.stringify(file));
        if (file) {
            httputils.getHttpUploadRequest(commont.getRepairDetailUploadUrl(this.data.formdata.id),file)
                .then(res => {
                    commont.log("received "+res);

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
                    Toptips(app.globalData.local_lang.page_repairrecord_index.upload_fail);
                });

        }
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


    getNewRepairRecord: function (id) {
      let that=this;
        httputils.getHttpRequest(commont.getRepaidDetailUrl(id),
            "GET", null, true).then(res => {

                if (res) {

                    if (res.res){
                        res.showRes=(res.res==1?"已解决":"未解决");
                    } else {
                        res.res=2;
                        res.showRes=("未解决");
                    }


                    that.setData({
                        formdata: res,
                        fileLists: res.fileUrlList
                    });

                }



        }, res => {
            Toptips(app.globalData.local_lang.page_repairrecord_index.repair_fail);
        });
    },


    //提交申请
    commitAuthentication: function (formData) {
        httputils.getHttpRequest(commont.getRepaidDetailsUrl(),
            "POST", formData, true).then(res => {
            Toast(app.globalData.local_lang.page_repairrecord_index.submit_success);
            setTimeout(()=>{
                app.goBack();
            },1000);
        }, res => {
            Toptips(app.globalData.local_lang.page_repairrecord_index.submit_fail);
        });
    }
})