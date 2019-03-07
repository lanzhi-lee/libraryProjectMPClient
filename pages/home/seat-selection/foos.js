const util = require('../../../utils/util.js')

module.exports = {
  init_currentRange, dateCheck,
  bind: { startChange, finishChange }
}

const basicTimeRange = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']

function startChange(that, event) {
  let index = Number(event.detail.value)
  that.setData({ startIndex: index })
  // 基本事件监听的处理↑↑↑↑↑↑↑↑↑

  let currentSelectHourIndex = Number(that.data.startRange[index].substr(0, 2)) - 8
  let currentFinishRange = basicTimeRange.slice(currentSelectHourIndex + 1)
  that.setData({ finishRange: currentFinishRange })
}
function finishChange(that, event) { 
  let index = event.detail.value
  that.setData({ finishIndex: index })
}
function a(that) { }
function a(that) { }
function a(that) { }
function a(that) { }
function a(that) { }
function a(that) { }
function a(that) { }
function a(that) { }
function a(that) { }


function init_currentRange(that) {

  let currentHour = (new Date()).getHours()

  // 当前时间相对于basicTimeRange的下标
  let currentHourIndex = 0
  if (currentHour >= 8) currentHourIndex = currentHour - 8

  // 开始范围
  let currentStartRange = basicTimeRange.slice(currentHourIndex)
  currentStartRange.pop()// 删除开始范围的最后一个元素
  // 如果当前时间大于8等于点，将开始范围的第一个元素设置为当前时间
  if (currentHour >= 8) currentStartRange[0] = util.formatDate(new Date()).substr(11, 5)

  // 结束范围
  let currentFinishRange = basicTimeRange.slice(currentHourIndex + 1)

  that.setData({ startRange: currentStartRange, finishRange: currentFinishRange })
}

function dateCheck(that) {
  let currentTime = that.data.currentTime
  let latestTime = that.data.latestTime

  if (currentTime.indexOf('*') == -1 && latestTime.indexOf('*') == -1) return true  // 时间正常
  else return false // 说明当前的时间选择有误
}