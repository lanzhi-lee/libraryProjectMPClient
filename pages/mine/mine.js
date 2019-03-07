// pages/mine/mine.js
const network = require('../../utils/network.js')
const data = require('../../utils/data.js')
const util = require('../../utils/util.js')

Page({
  data: { btn_showFlag: Boolean(1), orderExist: false },

  onLoad: function () {
let str = 'abc'
console.log(str.toUpperCase())


    let that = this
    that.setData({
      allIdMap: util.parse.strToMapObj(wx.getStorageSync('allIdMap')),
      // 此处userid应当由缓存中获取，以下仅作测试
      userid: wx.getStorageSync('userinfo').userId // 此处竟然也是userID
    })

    that.getCurrentOrderMsg(that.data.userid)
  },

  onShow: function () {
    let flag = wx.getStorageSync('isFromSelect')
    if (flag) wx.startPullDownRefresh()
    wx.setStorageSync('isFromSelect', false)
    // {
    //   success: () => {
    //     console.log('haha')
    //   }
    // }
  },

  onPullDownRefresh() {
    let that = this
    console.log(that.data.orderInfo)
    wx.showLoading({ title: '正在刷新' })
    // console.log('xialai')
    that.getCurrentOrderMsg(() => { wx.stopPullDownRefresh() })
  },

  getCurrentOrderMsg: function (cb) {
    let that = this
    let data = { userid: that.data.userid }
    network.user.getCurrentOrderMsg(data, (res) => {
      console.log(res)
      if (res.length) {
        that.setData({ orderExist: true, orderInfo: that.ParseForMineBycurrentOrder(that, res[0]) })
        typeof cb == 'function' && cb()
      } else that.setData({ orderExist: false })


    })
  },

  ParseForMineBycurrentOrder: function (that, currentOrder) {
    let targetData = {}

    // let keys = util.seat.getKeysBySeatid('010101001006' || currentOrder.seatId)
    let keys = util.seat.getKeysBySeatid(currentOrder.seatId)
    let infotemp = util.seat.getCurrentSeatInfo(keys, that.data.allIdMap)
    console.log(infotemp)

    targetData.user = wx.getStorageSync('userinfo').userName
    targetData.seatid = currentOrder.seatId.substr(9, 3)
    targetData.location = infotemp.storey
    targetData.room = infotemp.room
    targetData.time = util.seat.getTimeByRange(currentOrder.orderStart, currentOrder.orderFinish)

    // console.log(targetData)
    return targetData
  },

  userSignIn: function () {
    let that = this
    console.log('用户签到')
    wx.showToast({ title: '签到成功！', icon: 'success', duration: 1000 })
    setTimeout(() => { that.setData({ btn_showFlag: false }) }, 1000)
  },

  userEnd: function () {
    let that = this
    // console.log('用户点击结束使用')
    wx.showModal({
      title: '结束使用',
      content: '是否确认？',
      confirmColor: '#ed3f14',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '正在结束' })
          setTimeout(() => { that.finishOrder() }, 500)
        }
      }
    })

  },

  userLeave: function () {
    let that = this
    console.log('用户暂时离开')
  },

  finishOrder: function () {
    let that = this
    let data = { userid: that.data.userid }
    network.seat.finishOrder(data, (res) => {
      console.error(res)
      wx.showToast({ title: '结束成功', icon: 'success', duration: 1000 })

      setTimeout(() => { that.setData({ orderExist: false, btn_showFlag: true }) }, 1000)
    })
  },
})