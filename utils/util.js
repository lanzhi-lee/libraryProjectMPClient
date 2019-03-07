module.exports = {
  userStatusCheck,
  formatDate, getTomorrow,
  parse: { mapToStrObj: parseMapToStrObj, strToMapObj: parseStrToMapObj },
  seat: { getKeysBySeatid, getCurrentSeatInfo, getTimeByRange }
}

function userStatusCheck() {
  return wx.getStorageSync('userStatus') == 'FREE'
}

function getTomorrow() {
  let today = Date.parse(new Date())
  let tomorrow = today + 24 * 60 * 60 * 1000
  return formatDate(new Date(tomorrow))
}

function formatDate(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? ('0' + month) : month
  let day = date.getDate()
  day = day < 10 ? ('0' + day) : day
  let hour = date.getHours()
  hour = hour < 10 ? ('0' + hour) : hour
  let minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  let second = date.getSeconds()
  second = second < 10 ? ('0' + second) : second
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  // return `${year}-${month}-${day} ${hour} : ${minute} : ${second}`
}

// 接受一个seatid，返回各个位置的id值
function getKeysBySeatid(seatid) {
  return {
    campusKey: seatid.substr(0, 2),
    buildingKey: seatid.substr(0, 4),
    storeyKey: seatid.substr(0, 6),
    roomKey: seatid.substr(0, 9)
  }
}

// 接受一个key值对象，一个id到位置名的map，返回位置名
function getCurrentSeatInfo(keys, map) {
  return {
    campus: map.campusMap.get(keys.campusKey),
    building: map.buildingMap.get(keys.buildingKey),
    storey: map.storeyMap.get(keys.storeyKey),
    room: map.roomMap.get(keys.roomKey)
  }
}

function getTimeByRange(start, end) {
  start = formatDate(new Date(start))
  end = formatDate(new Date(end))
  return `${start.substr(0, 16)} - ${end.substr(11, 5)}`
}

// 接受一个数据值为map对象的obj，并将值转为数组样JSON字符串
function parseMapToStrObj(obj) {
  for (let key in obj) { obj[key] = JSON.stringify([...obj[key]]) }
  return obj
}

// 接受一个数据值为String的obj，并将值转为map对象
function parseStrToMapObj(obj) {
  for (let key in obj) { obj[key] = new Map(JSON.parse(obj[key])) }
  return obj
}