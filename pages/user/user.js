// pages/user/user.js
Page({

  data: {},

  onLoad: function (options) {
    let that = this
    let userinfo = wx.getStorageSync('userinfo')
    that.setData({
      userinfo: {
        name: userinfo.userName,
        college: userinfo.userAcademy,
        major: userinfo.userProfession
      }
    })

    // data = {
    //   "userId": 1610252664,
    //   "userName": "李战",
    //   "userNumber": "1610252690",
    //   "userPassword": "123456",
    //   "userSex": "男",
    //   "userAcademy": "软件学院",
    //   "userProfession": "网络工程",
    //   "userViolation": "0",
    //   "userStatus": "free"
    // }
  },
  logout: function () {
    wx.showModal({
      title: '即将退出登录',
      content: '是否确定',
      confirmColor: '#ed3f14',
      success: function (res) {
        if (res.confirm) {
          // 清除缓存，关闭所有页面，重新打开登录页
          wx.clearStorage()
          wx.reLaunch({ url: '/pages/signin/login/login' })
        }
      }
    })
  }
})