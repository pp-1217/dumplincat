// pages/authentication/authentication.js
var app = getApp();
const httputils = require('../../utils/httputils');
const config = require('./config');
const commont = require('../../utils/commont');
const Toptips = require('../../dist/toptips/toptips');
const Toast = require('../../dist/toast/toast');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_lang: {},

        config,
        fileLists: [], //type ,url,id
        authenticationData: {},//默认数据
        value: '',
        formdata: {},//form 信息
        btnText: '',
        canModify: true,

        sexErr: false,
        emailErr:false,

        categoryStr: '',//申请分类,不能修改时
        // categorySelectValue:0,
        busList: [],//原始数据
        busStrList: [],//申请分类
      busslectIndex:0,

      // custom sheet
      show: false,
      cancelWithMask: true,
      actions: [],
      cancelText: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      this.setData({
        
        local_lang: app.globalData.local_lang.pages_authentication_authentication,
        btnText: app.globalData.local_lang.pages_authentication_authentication.sure_submit,
        categoryStr: app.globalData.local_lang.pages_authentication_authentication.categoryStr,
        actions: [{
          name: app.globalData.local_lang.pages_authentication_authentication.item_1,
          subname: app.globalData.local_lang.pages_authentication_authentication.subitem_1,
          className: 'action-class',
          loading: false
        }, {
          name: app.globalData.local_lang.pages_authentication_authentication.item_2,
          subname: app.globalData.local_lang.pages_authentication_authentication.subitem_2,
          className: 'action-class',
          loading: false
        }],
        cancelText: app.globalData.local_lang.pages_authentication_authentication.close_action
      })

      wx.setNavigationBarTitle({
        title: this.data.local_lang.nav_title,

      });

        Toast.setDefaultOptions({
            selector: '#zan-toast'
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getCategoryList();
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },


    getAuthentication: function (busList) {


        httputils.getHttpRequest(commont.getAuthenticationUrl(), "GET", null, true)
            .then(res => {
                let formdata = {};
                formdata.id = res.id;
                formdata.name = res.name;

                formdata.sex = res.sex;
                if (res.sex && (res.sex == "1"||res.sex==1)) {
                    formdata.showSex = "男";
                } else {
                    formdata.showSex = "女";
                }

                formdata.age = res.age;
                formdata.nativePlace = res.nativePlace;
                formdata.phone = res.phone;
                formdata.company = res.company;
                formdata.address = res.address;
                formdata.category = res.category;
                formdata.email=res.email;

                let btnText = "确认提交";
                if (res.status == 4) {
                    btnText = "确认修改";
                }

                this.setData({
                    authenticationData: res,
                    formdata: formdata,
                    btnText: btnText,
                    canModify: (res.status != 1 && res.status != 2 && res.status != 3),
                    fileLists: res.fileUrlList,
                    categoryStr:commont.getCategoryNameByValue(busList,formdata.category)
                })
                wx.hideLoading();
            }, res => {
                Toptips("获取认证信息失败");
                wx.hideLoading();
            });
    },

    onFileDeleteClick: function (e) {
        commont.log(JSON.stringify(e));
        let index = e.currentTarget.dataset.index;
        let fileLists = this.data.fileLists;

        let fileId = fileLists[index].id;
        this.deleteImgVideo(fileId, index);

    },

    handleZanFieldChange: function (e) {
        commont.log("handleZanFieldChange " + JSON.stringify(e));

        let formData = this.data.formdata;

        commont.log("formdata is " + JSON.stringify(formData));

        let key = e.currentTarget.dataset.key;
        let value = e.detail.detail.value;

        if (!value)
            return;

        if (key === "name") {
            formData.name = value;
        } else if (key === "sex") {
            if (value == "男") {
                value = 1;
            } else if (value == "女") {
                value = 2;
            } else {
                this.setData({
                    sexErr: true
                });
                return;
            }


            formData.sex = value;
        } else if (key === "age") {
            formData.age = value;
        } else if (key === "nativePlace") {
            formData.nativePlace = value;
        } else if (key === "phone") {
            formData.phone = value;
        } else if (key === "company") {
            formData.company = value;
        } else if (key === "address") {
            formData.address = value;
        } else if (key === "email") {
            commont.log("isEmail "+commont.isEmail(value));
            let isEmail=commont.isEmail(value);
            if (!isEmail) {
                this.setData({
                    emailErr: true
                });
                return;
            }


            formData.email=value;

        }

        this.setData({
            emailErr:false,
            sexErr: false,
            formData: formData
        });
    },

    onCommitClick: function () {
        let formData = this.data.formData;

        if (this.checkFormDataNULL(formData)){
            return;
        }

        if (formData) {
            this.commitAuthentication(formData);
        }
    },


    checkFormDataNULL:function(formData){

        let result=false;
        if ((!formData.name || formData.name == '')){
            Toptips("请添加姓名！");
            result=true;
        }else if ((!formData.phone || formData.phone == '')){
            Toptips("请添加联系方式！");
            result=true;
        }else if ((!formData.company || formData.company == '')){
            Toptips("请添加公司名称！");
            result=true;
        }else if ((!formData.address || formData.address == '')){
            Toptips("请添加地址！");
            result=true;
        }else if ((!formData.sex || formData.sex == '')){
            Toptips("请添加性别！");
            result=true;
        }else if ((!formData.age || formData.age == '')){
            Toptips("请添加年龄！");
            result=true;
        }else if ((!formData.nativePlace || formData.nativePlace == '')){
            Toptips("请添加籍贯！");
            result=true;
        }else if ((!formData.email || formData.email == '')){
            Toptips("请添加邮箱地址！");
            result=true;
        }else if ((!formData.category || formData.category == '')){
            Toptips("请选择认证类别！");
            result=true;
        }
        return result;
    },

    //选择方式
    onFileSelectClick: function () {

        let that = this;

        //展示需要上传的类别
        wx.showActionSheet({
          itemList: this.data.local_lang.sheet,
            success: function (res) {
                commont.log(res.tapIndex);
                let index = res.tapIndex;
                that.chooseFile(index);
            }, fail: function (res) {
                commont.log(res.tapIndex);
                if (res && res.indexOf('cancel') != -1) {
                    Toast({
                        message: '取消选择',
                        selector: '#zan-toast'
                    });
                }

            }
        })
    },
    //
    onSelectSexClick:function(){
        let that = this;
        let canModify=this.data.canModify;
        if (!canModify) {
            commont.log("not allow modify ");
            return;
        }




        let formData=that.data.formdata;
        let sexs=['男','女'];

        wx.showActionSheet({
            itemList:sexs,
            success: function (res) {
                commont.log(res.tapIndex);

                formData.sex=(res.tapIndex+1);
                formData.showSex=sexs[res.tapIndex];
                that.setData({
                    formdata:formData
                });

            }, fail: function (res) {
                commont.log(res.tapIndex);
            }
        })
    },

    //三种方式选择文件
    chooseFile: function (index) {
        //只能上传5个
        let list = this.data.fileLists;
        if (list && list.length >= 5) {
            Toptips("只允许上传5个！");
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
            let id = this.data.authenticationData.id;
            httputils.getHttpRequest(commont.getAuthenticationUrl() + "/" + id +
                "/key", "GET", null, true
            ).then(res => {
                commont.log("获取上传码成功，" + res);
                app.showBigFile(res);
            }, res => {
                Toptips("获取授权码失败");
            });
        }
    },

    //上传图片 2和视频 1
    uploadImgVideo: function (file, type) {
        let that = this;

        let id=this.data.formdata.id;
        if (!id) {
            return;
        }


        commont.log("upload fils " + JSON.stringify(file));
        if (file) {
            httputils.getHttpUploadRequest(commont.getAuthenticationUploadUrl() + id, file)
                .then(res => {

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
                    Toptips("上传失败！");
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

    commitAuthentication: function (formData) {
        // commont.log("start commit "+JSON.stringify(formData));
      let category=formData.category ;
      if (!category){
        formData.category = this.data.busList[this.data.busslectIndex].value
      }


        httputils.getHttpRequest(commont.getAuthenticationUrl(),
            "POST", formData, true).then(res => {
            Toast("提交成功！");
            setTimeout(()=>{
                app.goBack();
            },1000);

        }, res => {
            Toptips("提交失败！");
        });
    },

    onSelectCategoryClick: function () {
        let that = this;
        let canModify=this.data.canModify;
        if (!canModify) {
            commont.log("not allow modify ");
            return;
        }

        let busStrList = that.data.busStrList;
        let busList = that.data.busList;
        let formData=that.data.formdata;

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

        /**
        wx.showActionSheet({
            itemList: busStrList,
            success: function (res) {
                commont.log(res.tapIndex);

                formData.category=busList[res.tapIndex].value;

                that.setData({
                    categoryStr: busStrList[res.tapIndex],
                    formdata:formData
                });

            }, fail: function (res) {
                commont.log(res.tapIndex);
            }
        })
         **/
    },

    //获取列表清单
    getCategoryList: function () {
        wx.showLoading({
            title: '加载中...',
        })
        let that = this;
        let busList = app.globalData.busList;
        let busStrList = app.globalData.busStrList;

        if (!busList||busList.length==0){
            httputils.getHttpRequest(commont.getCategoryList(), "POST", {
                code: "bus"
            }, true).then(res => {
                if (res) {

                    app.globalData.busList=res;
                    app.globalData.busStrList=commont.parseCategoryArray(res);
                    that.setData({
                        busList: res,//原始数据
                        busStrList: commont.parseCategoryArray(res)
                    });

                    that.getAuthentication(res);
                }
            }, res => {
                Toptips("获取信息失败");
                wx.hideLoading();
            });
        }else{
            that.setData({
                busList: busList,//原始数据
                busStrList: busStrList
            });

            that.getAuthentication(busList);
        }




    },

  //custom sheet
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
    formdata.category = busList[index].value;
    this.setData({
      formdata: formdata,
      busslectIndex: index,
      categoryStr:busList[index].name
    });
    this.closeActionSheet();
  },
})
