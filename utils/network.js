const fetch = require('./fetch.js')
const api = require('./api.js')

module.exports = {
  user: { userLogin, userRegister, getCurrentOrderMsg, getOrderHistory },
  location: { getSingleRoomList, getAllRegions },
  seat: { startOrder, finishOrder, getSingleSeatMsg }

}
// 用户登录
function userLogin(data, cb) {
  let url = api.user.login
  data = { userNumber: data.username, userPassword: data.password }

  fetch.postData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      typeof cb === 'function' && cb(res.data)
    } else {
      wx.showModal({ title: '登录失败', content: res.message, showCancel: false })
      console.error(res.message)
    }
  })
}

// 用户注册
function userRegister(data, cb) {
  let url = api.user.adduser
  data = {
    userName: data.username,
    userNumber: data.schoolnum,
    userPassword: data.password,
    userSex: data.sex,
    userAcademy: data.college,
    userProfession: data.major
  }

  fetch.postData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      typeof cb === 'function' && cb(res.data)
    } else {
      console.error(res.message)
      wx.showModal({ title: '注册失败', content: res.message, showCancel: false })
    }
  })
}

// 用户当前预约
function getCurrentOrderMsg(data, cb) {
  let url = api.user.msg
  data = { userId: data.userid }

  fetch.getData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      typeof cb === 'function' && cb(res.data)
    } else {
      console.error(res.message)
    }
  })
}

// 用户全部历史预约
function getOrderHistory(data, cb) {
  let url = api.user.history
  data = { userId: data.userid }

  fetch.getData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      if (res.data.length) typeof cb === 'function' && cb(res.data.reverse())
    } else {
      console.error(res.message)
    }
  })
}

// 基本信息查询
function getAllRegions(cb) {
  let url = api.location.all
  let data = {}
  fetch.getData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      typeof cb === 'function' && cb(res.data)
    } else {
      console.error(res.message)
    }
  })
}

// 单区域座位列表
function getSingleRoomList(data, cb) {
  let url = api.seat.orders
  data = { roomId: data.roomid }
  console.log(data)
  fetch.getData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      typeof cb === 'function' && cb(res.data)
    } else {
      console.error(res.message)
    }
  })
}

// 开始占座
function startOrder(data, cb) {
  let url = api.seat.order
  data = {
    orderStart: data.start,      // 占座开始时间
    orderFinish: data.finish,    // 占座结束时间
    userId: data.userid,         // 用户id
    seatId: data.seatid          // 座位id
  }
  console.log(data)
  fetch.postData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      wx.showToast({ title: '预约成功', icon: 'success', duration: 1000 })
      wx.setStorageSync('userStatus', 'BOOKED')
      setTimeout(() => { typeof cb === 'function' && cb(res.data) }, 1000)

    } else {
      wx.showModal({ title: '预约失败', content: res.message, showCancel: false })
      console.error(res.message)
    }
  })
}

// 结束占座
function finishOrder(data, cb) {
  let url = api.seat.finish
  data = { userId: data.userid }

  fetch.getData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      wx.setStorageSync('userStatus', 'FREE')
      typeof cb === 'function' && cb(res.data)
    } else {
      console.error(res.message)
    }
  })
}

// 获取单个座位当前信息
function getSingleSeatMsg(data, cb) {
  let url = api.seat.msg
  data = { seatId: data.seatid }

  fetch.getData(url, data, (res) => {
    wx.hideLoading()
    if (res.code == '200') {
      typeof cb === 'function' && cb(res.data)
    } else {
      console.error(res.message)
    }
  })
}



