// pages/login/login.js
const app = getApp()
let api = require('../../../utils/api.js');
let bindChange = require('../bindChange.js');
let login_check = require('../login_check.js').login;

let network = require('../../../utils/network.js')
Page({
  data: {
    username: '',
    password: '',
    index: 0,
    collegeIndex: '',
    roleIndex: '',

    isAgree: false,
    showTopTips: false,
    topTips: ''
  },
  onLoad() {
    // console.log(login_network, 'login_network')
    // console.error('haha')
  },

  loginCheck(event) {
    let that = this
    // console.log("loginCheck", event)

    login_check(that, event, (event) => {
      // 下一步操作
      console.log("进入验证通过回调函数")
      wx.showLoading({ title: '正在提交' })
      setTimeout(() => { that.login(event)},500)
    })
  },

  login: function (event) {
    console.log(event)
    // let data = { username: '1610252687', password: '123456' }
    let data = { username: event.detail.value.username, password: event.detail.value.password }
    console.log(data)

    network.user.userLogin(data, (res) => {
      console.log(res)
      wx.setStorageSync('userinfo', res)
      wx.setStorageSync('userStatus', res.userStatus.toUpperCase())
      wx.showLoading({ title: '正在登录' })
      setTimeout(() => { wx.switchTab({ url: '/pages/home/index/index' }) }, 500)
    })
  },

  bindInputChange: function (event) {
    let that = this;
    bindChange.inputChange(event, that);
  }
})