// pages/history/history.js
const network = require('../../utils/network.js')
const util = require('../../utils/util.js')
const data = require('../../utils/data.js')

Page({
  data: {},

  onLoad: function (options) {
    let that = this
    that.setData({
      allIdMap: util.parse.strToMapObj(wx.getStorageSync('allIdMap')),
      userid: wx.getStorageSync('userinfo').userId
    })
    that.getOrderHistory()
  },
  onPullDownRefresh() {
    let that = this
    wx.showLoading({ title: '正在刷新' })
    // console.log('xialai')
    setTimeout(() => { that.getOrderHistory(() => { wx.stopPullDownRefresh() })},500)
    
  },

  getOrderHistory: function (cb) {
    let that = this
    let data = { userid: that.data.userid }
    network.user.getOrderHistory(data, (res) => {
      console.log(res)
      if (res.length) {
        that.setData({ historylist: that.ParseForHistoryByhistoryOrders(that, res) })
        typeof cb == 'function' && cb()
      }
      else { }
    })
  },

  ParseForHistoryByhistoryOrders: function (that, historyOrders) {
    let obj = {}
    let targetData = []

    for (let item of historyOrders) {
      // console.log(item)

      let keys = util.seat.getKeysBySeatid(item.seatId)
      let infotemp = util.seat.getCurrentSeatInfo(keys, that.data.allIdMap)
      // console.log(infotemp)
      let timetemp = util.seat.getTimeByRange(item.orderStart, item.orderFinish)
      // console.log(timetemp)

      obj.seatid = item.seatId.substr(9, 3)
      obj.location = infotemp.storey
      obj.room = infotemp.room
      obj.date = timetemp.substr(0, 10)
      obj.time = timetemp.substr(11, 13)

      // console.log(obj)
      targetData.push(obj)
      obj = {}
    }
    // console.log(targetData)
    return targetData
  }
})