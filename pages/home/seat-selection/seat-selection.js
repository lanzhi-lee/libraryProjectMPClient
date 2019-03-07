// pages/index/seat-selection.js
const network = require('../../../utils/network.js')
const util = require('../../../utils/util.js')

let basicTimeRange = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
const foos = require('./foos.js')

Page({
  init_currentRange: function () {
    let that = this
    foos.init_currentRange(that)
  },

  startChange: function (event) {
    let that = this
    foos.bind.startChange(that, event)
  },

  finishChange: function (event) {
    let that = this
    foos.bind.finishChange(that, event)
  },

  data: {
    startIndex: 0,
    startRange: basicTimeRange,
    finishIndex: 0,
    finishRange: basicTimeRange.slice(1),

    currentTime: '**:**',
    isSelectedTomorrow: false
  },

  onLoad: function (options) {
    // console.log(!!(-1))

    let that = this
    that.init_date()

    that.init_currentRange()
    let list = wx.getStorageSync('currentRoomList')
    for (let item of list) { item.seatNumber = item.seatId.substr(9, 3) }

    that.setData({ list })

  },

  init_date: function () {
    let that = this

    let date = new Date()
    let today = util.formatDate(date).substr(0, 10)
    let tomorrow = util.getTomorrow().substr(0, 10)

    let currentHour = date.getHours()
    console.log(currentHour)

    that.setData({ currentDate: today })

    if (currentHour < 18) that.setData({ dateItemList: [today] })
    else if (currentHour < 22) that.setData({ dateItemList: [today, tomorrow] })
    else that.setData({ currentDate: today, dateItemList: [tomorrow] })


    // that.setData({ currentDate: dateStr.substr(0, 10), latestTime: '22:00' })

    // // 当前时间currentHour
    // // 小于早上8点。设置当前时间为08:00
    // if (currentHour < 8) that.setData({ currentTime: '08:00' })
    // // 小于晚上10点，显示正常时间
    // else if (currentHour < 22) that.setData({ currentTime: dateStr.substr(11, 5) })
    // // 大于晚上10点，显示**:**
    // else that.setData({ latestTime: '**:**' })
  },

  startOrder: function (event) {
    let that = this

    // console.log(event)
    let index = Number(event.currentTarget.id) - 1

    let currentDate = that.data.currentDate
    let currentTime = that.data.currentTime
    let latestTime = that.data.latestTime

    let data = {
      // userid: wx.getStorageSync('userinfo').userNumber,
      // 此处竟然是userID
      userid: wx.getStorageSync('userinfo').userId,
      seatid: that.data.list[index].seatId,
      start: Date.parse(`${currentDate} ${currentTime}:00`),
      finish: Date.parse(`${currentDate} ${latestTime}:00`)
    }

    // console.log(data)
    network.seat.startOrder(data, (res) => {
      // console.error(res)
      wx.showLoading()
      // 停留0.5秒跳至当前预约
      wx.setStorageSync('isFromSelect', true)
      setTimeout(() => { wx.hideLoading(); wx.switchTab({ url: '/pages/mine/mine' }) }, 500)
    })
  },

  itemclick: function (event) {
    // 点击页面座位的回调
    let that = this

    let currentDate = that.data.currentDate
    let currentTime = that.data.currentTime
    let latestTime = that.data.latestTime

    // 两层判断，外层判断用户状态，内层判断时间
    if (util.userStatusCheck()) {
      // 日期时间选择正常，提醒即将占座
      if (that.dateCheck())
        wx.showModal({
          title: '即将预约',
          content: `${currentDate}\n${currentTime}-${latestTime}`,
          // 用户点击确定，调用占座函数
          success: (res) => { if (res.confirm) that.startOrder(event) }
        })
      // 不正常则提示有误
      else wx.showModal({ title: '无法占座！', content: '当前时间选择有误，请重新选择！', showCancel: false })
    }
    else wx.showModal({ title: '无法占座！', content: '已有预约，请使用当前预约座位！', showCancel: false })
  },

  dateCheck: function () {
    // 检查当前的日期、时间选择是否符合要求
    let that = this
    foos.dateCheck(that)
  },



  select_date: function () {
    let that = this
    let itemList = that.data.dateItemList

    wx.showActionSheet({
      itemList,
      success: function (res) {
        if (!res.cancel) {
          console.log(res)
          // that.setData({ currentDate: itemList[res.tapIndex] })
          // // 如果选择的日期是明天，则设置默认时间为 08:00-22:00
          // if (res.tapIndex) that.setData({ currentTime: '08:00', latestTime: '22:00' })
        }
      }
    })
    
    // 仅当时间在18点后允许预约第二天的座位
    // if ((new Date).getHours() >= 18) {
    //   let today = util.formatDate(new Date()).substr(0, 10)
    //   let tomorrow = util.getTomorrow().substr(0, 10)
    //   let itemList = [today, tomorrow]

    // }
  },

  select_time: function () {

  }
})

    // switch (that.data.list[index].seatStatus) {
    //   case 'booked':
    //     wx.showModal({ title: '无法占座！', content: '当前座位已被占用，请选用其他座位', showCancel: false })
    //     break;
    //   case 'deprecated':
    //     wx.showModal({ title: '无法占座！', content: '座位暂无法使用，请选用其他座位', showCancel: false })
    //     break;
    //   case 'free':
    //     break;
    // }