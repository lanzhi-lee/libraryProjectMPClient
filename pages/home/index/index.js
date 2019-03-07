  // , "navigationStyle": "custom"

//index.js
// const ddm = require('../common/dd-menu.js')
const bind = require('../bind.js')

const api = require('../../../utils/api.js')
const data = require('../../../utils/data.js')
const network = require('../../../utils/network.js')
const util = require('../../../utils/util.js')
const Static = require('../../../utils/static.js')

//获取应用实例
const app = getApp()
Page({
  data: {
    campus: ['请选择校区', '金明校区', '明伦校区'],
    campusIndex: 0,

    buildings: ['请选择建筑'],
    buildingIndex: 0,

    storeys: ['请选择楼层'],
    storeyIndex: 0,

    regions: ['请选择区域'],
    regionsIndex: 0
  },


  onLoad: function () {
    let that = this

    wx.showLoading({ title: '加载区域列表', mask: true })
    network.location.getAllRegions(res => {
      // console.log(data.ParseForPicker(res))/
      that.setData({
        originalData: data.ParseForPicker(res),
        regionsKeyMap: data.getRegionsKeyMap(res)
      })

      // 创建一个各个位置的id到位置名的map并存入缓存，由于缓存无法直接接受map，需先将map转换为数组形状的json字符串
      let allIdMap = util.parse.mapToStrObj(data.getAllIdMap(res))
      // console.log(allIdMap)
      wx.setStorageSync('allIdMap', allIdMap)
    })
  },

  queryRoomList: function () {
    let that = this
    let regionsKeyMap = that.data.regionsKeyMap
    let regionsKey = that.data.regions[that.data.regionsIndex]//当前区域名
    let roomid = regionsKeyMap.get(regionsKey)//当前区域id

    if (!roomid) wx.showModal({ title: '警告！', content: '请选择查询区域!', showCancel: false, confirmColor: '#ff0000' })
    else {
      // console.log(regionsKey, roomid)

      wx.showLoading({ title: '加载座位列表', mask: true })
      // roomid = '010101001' //当前无可用教室，该roomid仅作测试用
      console.log(roomid)

      let data = { roomid }
      network.location.getSingleRoomList(data, (res) => {
        console.log(res)
        if (!res.length) wx.showModal({ content: '当前区域无可用座位', showCancel: false })
        else {
          wx.setStorageSync('currentRoomList', res)
          wx.navigateTo({ url: '../seat-selection/seat-selection' })
        }
      })
    }
  },


  bindCampusChange: function (event) {
    let that = this
    // console.log
    bind.campusChange(that, event, that.data.originalData)
  },

  bindBuildingsChange: function (event) {
    let that = this
    bind.buildingsChange(that, event, that.data.originalData)
  },

  bindStoreyChange: function (event) {
    let that = this
    bind.storeyChange(that, event, that.data.originalData)
  },

  bindRegionsChange: function (event) {
    let that = this
    bind.regionsChange(that, event, that.data.originalData)
  },

  currentPickerData: function (event) {
    let that = this
    console.log(event)
    console.log(that)
    let campusIndex = that.data.campusIndex
    let buildingIndex = that.data.buildingIndex
    let storeyIndex = that.data.storeyIndex
    let regionsIndex = that.data.regionsIndex

    let currentCampus, currentBuilding, currentStorey, currentRegion

    currentCampus = that.data.campus[campusIndex]
    currentBuilding = that.data.buildings[buildingIndex]
    currentStorey = that.data.storeys[storeyIndex]
    currentRegion = that.data.regions[regionsIndex]

    console.log(currentCampus, currentBuilding, currentStorey, currentRegion)
  }
})

