const app = getApp();

const util = require('../../utils/util.js')
let basicTimeRange = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
Page({
  // data: {
  //   StatusBar: app.globalData.StatusBar,
  //   CustomBar: app.globalData.CustomBar,
  //   TabCur: 0,
  //   tabNav: [ 'Grid布局']
  // },
  // tabSelect(e) {
  //   console.log(e);
  //   this.setData({
  //     TabCur: e.currentTarget.dataset.id,
  //     scrollLeft: (e.currentTarget.dataset.id - 1) * 60
  //   })
  // }
  data: {
    startIndex: 0,
    startRange: basicTimeRange,
    finishIndex: 0,
    finishRange: basicTimeRange.slice(1),

  },
  onLoad: function() {
    let that = this

    // let date = new Date()
    // console.log(date.getHours())
    // console.log(typeof date.getHours())
    // console.log(app.globalData.basicTimeRangeMap)
    that.initCurrentRange()
    // console.log(basicTimeRange.slice(0, 3))
    // console.log(currentHour)
  },
  initCurrentRange: function() {
    let that = this
    let currentHour = (new Date()).getHours()

    // 当前时间相对于basicTimeRange的下标
    let currentHourIndex = 0
    if (currentHour >= 8) currentHourIndex = currentHour - 8

    // 开始范围
    let currentStartRange = basicTimeRange.slice(currentHourIndex)
    currentStartRange.pop() // 删除开始范围的最后一个元素
    // 如果当前时间大于8等于点，将开始范围的第一个元素设置为当前时间
    if (currentHour >= 8) currentStartRange[0] = util.formatDate(new Date()).substr(11, 5)

    // 结束范围
    let currentFinishRange = basicTimeRange.slice(currentHourIndex + 1)

    that.setData({
      startRange: currentStartRange,
      finishRange: currentFinishRange
    })
  },

  startChange: function(event) {
    let that = this
    let index = Number(event.detail.value)
    that.setData({
      startIndex: index
    })
    // 基本事件监听的处理↑↑↑↑↑↑↑↑↑

    let currentSelectHourIndex = Number(that.data.startRange[index].substr(0, 2)) - 8
    let currentFinishRange = basicTimeRange.slice(currentSelectHourIndex + 1)
    that.setData({
      finishRange: currentFinishRange
    })
  },
  finishChange: function(event) {
    let that = this
    let index = event.detail.value
    that.setData({
      finishIndex: index
    })
  }
})