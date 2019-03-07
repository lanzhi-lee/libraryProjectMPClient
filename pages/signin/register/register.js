// pages/login/login.js
const app = getApp()
const network = require('../../../utils/network.js')

let bindChange = require('../bindChange.js');
let login_check = require('../login_check.js').register;

Page({
  data: {
    username: '', password: '',
    index: 0,

    sex: ["女", "男"],
    sexIndex: 1,
    sexItems: [{ name: '男', value: '1', checked: true }, { name: '女', value: '0' }],

    collegeIndex: '',
    colleges: ["软件学院"],

    isAgree: false,
    showTopTips: false,
    topTips: ''
  },

  onLoad: function () { },
  loginCheck(event) {
    let that = this
    // console.log("loginCheck", event)

    login_check(that, event, (event) => {
      // 下一步操作
      console.log("进入验证通过的回调函数")
      that.register(event)
    })
  },

  register: function (event) {
    let that = this
    let data = {
      username: event.detail.value.username,
      schoolnum: event.detail.value.schoolnum,
      password: event.detail.value.password,
      sex: event.detail.value.sex == '1' ? '男' : '女',
      college: event.detail.value.college,
      major: event.detail.value.major,
    }
    // console.log(data)

    that.reminderBeforeRegister(data, () => {
      network.user.userRegister(data, (res) => {
        console.log(res)
        wx.showModal({
          content: '注册成功~~~\n即将返回登录', showCancel: false,
          success: (res) => {
            if (res.confirm) wx.navigateBack()
          }
        })
      })
    })

  },
  reminderBeforeRegister: function (data, cb) {
    wx.showModal({
      title: '即将注册账号',
      content: `${data.username}\n${data.schoolnum}\n${data.sex}\n${data.college}\n${data.major}`,
      success: (res) => {
        if (res.confirm) typeof cb == 'function' && cb()
        else console.log('取消注册')
      }
    })
  },
  bindInputChange: function (event) {
    let that = this;
    bindChange.inputChange(event, that);
  },

  bindSexChange: function (event) {
    let that = this;
    bindChange.sexChange(event, that)
  },

  bindAgreeChange: function (event) {
    let that = this;
    bindChange.agreeChange(event, that)
  }
})