// pages/rating2/rating2.js
var app = getApp()
const commont = require('../../utils/commont')
const httputils = require('../../utils/httputils')

const Toptips = require('../../dist/toptips/toptips')
const Toast = require('../../dist/toast/toast')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local_lang: {},
    authenId: '',
    formData: {},

    levelIndex: 0,
    levelList: [],//原始数据
    levelStrList: [],

    roleIndex: 0,
    roleList: [],//原始数据
    roleStrList: [],

    abilityStrList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      local_lang: app.globalData.local_lang.page_rating2_rating2,
      abilityStrList: app.globalData.local_lang.page_rating2_rating2.abilityStrList
    });

    wx.setNavigationBarTitle({
      title: this.data.local_lang.nav_title,
    })

    let authenId = options.authenId
    this.setData({
      authenId: authenId
    })

    Toast.setDefaultOptions({
      selector: '#zan-toast'
    })

    let levelList = app.globalData.levelList
    let roleList = app.globalData.roleList
    if (levelList.length > 0) {
      this.setData({
        levelIndex: 0,
        levelList: levelList,//原始数据
        levelStrList: app.globalData.levelStrList
      })
    } else {
      this.getCategoryList('level')
    }

    if (roleList.length > 0) {
      this.setData({
        roleIndex: 0,
        roleList: roleList,//原始数据
        roleStrList: app.globalData.roleStrList
      })
    } else {
      this.getCategoryList('role')
    }
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
    this.getDefaultAuthen()

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
  bindTextAreaBlur: function (e) {
    let value = e.detail.value
    commont.log(e.detail.value)
    let formData = this.data.formData
    formData.remark1 = value
    this.setData({
      formData: formData
    })
  },
  bindTextAreaBlur1: function (e) {
    let value = e.detail.value
    commont.log(e.detail.value)
    let formData = this.data.formData
    formData.remark2 = value
    this.setData({
      formData: formData
    })
  },
  onAbilityClick: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let itemList = this.data.abilityStrList
    let formData = this.data.formData

    commont.log(JSON.stringify(e))
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {

        commont.log(res.tapIndex)
        let id = (res.tapIndex + 1)
        if (index == 0) {
          formData.ability1 = id

        } else if (index == 1) {
          formData.ability2 = id
        } else if (index == 2) {
          formData.ability3 = id
        }

        that.setData({
          formData: formData
        })

      },
      fail: function (res) {
        commont.log(res.errMsg)
      }
    })
  },
  onCategoryClick: function (e) {

    let that = this
    let index = e.currentTarget.dataset.index
    let roleList = this.data.roleList
    let categoryList = this.data.roleStrList
    let formData = this.data.formData

    commont.log(JSON.stringify(e))
    wx.showActionSheet({
      itemList: categoryList,
      success: function (res) {
        commont.log(res.tapIndex)
        let index = res.tapIndex
        formData.role = roleList[index].value
        that.setData({
          roleIndex: index,
          formData: formData
        })

      },
      fail: function (res) {
        commont.log(res.errMsg)
      }
    })

  },

  onLevelClick: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let levelList = this.data.levelList
    let levelStrList = this.data.levelStrList
    let formData = this.data.formData

    commont.log(JSON.stringify(e))
    wx.showActionSheet({
      itemList: levelStrList,
      success: function (res) {
        commont.log(res.tapIndex)

        let index = res.tapIndex
        formData.level = levelList[index].value
        that.setData({
          levelIndex: index,
          formData: formData
        })
      },
      fail: function (res) {
        commont.log(res.errMsg)
      }
    })
  },

  getDefaultAuthen: function () {
    let that = this
    let authenId = this.data.authenId
    httputils.getHttpRequest(commont.getAuthenticationStartUrl(authenId), 'GET', null, true)
      .then(res => {
        if (res) {
          let roleIndex = 0
          let levelIndex = 0
          if (res.role) {
            roleIndex = commont.getCategoryIndexByValue
            (that.data.roleList, res.role)
          }

          if (res.level) {
            levelIndex = commont.getCategoryIndexByValue
            (that.data.levelList, res.level)
          }

          that.setData({
            formData: res,
            roleIndex: roleIndex,
            levelIndex: levelIndex
          })
        }
      }, res => {

      })
  },

  checkFormDataNULL: function (formData) {

    let result = false
    if ((!formData.remark1 || formData.remark1 == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.first_info)
      result = true
    } else if ((!formData.remark2 || formData.remark2 == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.result_info)
      result = true
    } else if ((!formData.role || formData.role == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.result_info)
      result = true
    } else if ((!formData.level || formData.level == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.result_info)
      result = true
    } else if ((!formData.ability1 || formData.ability1 == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.machine_ability)
      result = true
    } else if ((!formData.ability2 || formData.ability2 == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.process_ability)
      result = true
    } else if ((!formData.ability3 || formData.ability3 == '')) {
      Toptips(app.globalData.local_lang.page_rating2_rating2.electrical_ability)
      result = true
    }
    return result
  },

  uploadAuthen: function () {
    let formData = this.data.formData


    if ((!formData.role || formData.role == '')) {
      formData.role=this.data.roleList[this.data.roleIndex].value;
    } else if ((!formData.level || formData.level == '')) {
      formData.level=this.data.levelList[this.data.levelIndex].value;
    }


    if (this.checkFormDataNULL(formData)) {
      return
    }

    httputils.getHttpRequest(commont.getAuthenticationDetailUrl(),
      'POST', formData, true).then(res => {
      Toast(app.globalData.local_lang.page_rating2_rating2.submit_info)
      setTimeout(() => {
        app.goBack()
      }, 1000)
    }, res => {
      Toptips(res)
    })
  },

  //获取列表清单
  getCategoryList: function (code) {
    let that = this
    httputils.getHttpRequest(commont.getCategoryList(), 'POST', {
      code: code
    }, true).then(res => {
      if (res) {
        let categoryList = res
        let categoryStrList = commont.parseCategoryArray(res)

        if (code == 'role') {
          that.setData({
            roleIndex: 0,
            roleList: categoryList,//原始数据
            roleStrList: categoryStrList
          })

          app.globalData.roleList = categoryList
          app.globalData.roleStrList = categoryStrList
        } else if (code == 'level') {
          that.setData({
            levelIndex: 0,
            levelList: categoryList,//原始数据
            levelStrList: categoryStrList
          })

          app.globalData.levelList = categoryList
          app.globalData.levelStrList = categoryStrList
        }

      }
    }, res => {
      Toptips(app.globalData.local_lang.page_rating2_rating2.list_info)
    })
  }

})
