module.exports = { campusChange, buildingsChange, storeyChange, regionsChange }

// const StaticData = require('../../../utils/static.js').data
// let data = require('../../../utils/data.js').ParseForPicker(StaticData)

function campusChange(that, event, data) {
  let currentValue = event.detail.value - 0
  // console.log('校区改变，值为', event.detail.value);

  // console.log(data)

  switch (currentValue) {
    case 0: that.setData({ campusIndex: 0, buildingIndex: 0, storeyIndex: 0, regionsIndex: 0 }); break;
    default: that.setData({ campusIndex: currentValue, buildingIndex: 1, storeyIndex: 1, regionsIndex: 1 }); break;
  }

  let buildingKey, storeyKey, regionKey
  if (currentValue) {
    buildingKey = that.data.campus[currentValue]
    storeyKey = data.buildingsMap.get(buildingKey)[0]
    regionKey = data.storeysMap.get(storeyKey)[0]
  }
  setPickerData(that, data, { name: 'campus', value: currentValue, buildingKey, storeyKey, regionKey })

}

function buildingsChange(that, event, data) {
  let currentValue = event.detail.value - 0
  console.log('建筑改变，值为', currentValue);

  switch (currentValue) {
    case 0: that.setData({ buildingIndex: 0, storeyIndex: 0, regionsIndex: 0 }); break;
    default: that.setData({ buildingIndex: currentValue, storeyIndex: 1, regionsIndex: 1 }); break;
  }

  let storeyKey, regionKey
  if (currentValue) {
    storeyKey = that.data.buildings[currentValue]
    regionKey = data.storeysMap.get(storeyKey)[0]
  }
  setPickerData(that, data, { name: 'building', value: currentValue, storeyKey, regionKey })
}

function storeyChange(that, event, data) {
  let currentValue = event.detail.value - 0
  // console.log('楼层改变，值为', currentValue);

  switch (currentValue) {
    case 0: that.setData({ storeyIndex: 0, regionsIndex: 0 }); break;
    default: that.setData({ storeyIndex: currentValue, regionsIndex: 1 }); break;
  }

  let regionKey = that.data.storeys[currentValue]
  setPickerData(that, data, { name: 'storey', value: currentValue, regionKey })
}

function regionsChange(that, event, data) {
  let currentValue = event.detail.value - 0
  that.setData({ regionsIndex: currentValue })

  // console.log('区域改变，值为', currentValue);
}

function setPickerData(that, data, targetObj) {

  let buildingsArr = ['请选择建筑']
  let storeysArr = ['请选择楼层']
  let regionsArr = ['请选择区域']

  // console.log(targetObj)

  switch (targetObj.name) {
    case 'campus': {
      if (targetObj.value)
        that.setData({
          buildings: buildingsArr.concat(data.buildingsMap.get(targetObj.buildingKey)),
          storeys: storeysArr.concat(data.storeysMap.get(targetObj.storeyKey)),
          regions: regionsArr.concat(data.regionsMap.get(targetObj.regionKey))
        })
      else that.setData({ buildings: buildingsArr, storeys: storeysArr, regions: regionsArr })
      break;
    }
    case 'building': {
      if (targetObj.value)
        that.setData({
          storeys: storeysArr.concat(data.storeysMap.get(targetObj.storeyKey)),
          regions: regionsArr.concat(data.regionsMap.get(targetObj.regionKey))
        })
      else that.setData({ storeys: storeysArr, regions: regionsArr })
      break;
    }
    case 'storey': {
      if (targetObj.value) that.setData({ regions: regionsArr.concat(data.regionsMap.get(targetObj.regionKey)) })
      else that.setData({ regions: regionsArr })
      break;
    }
  }

}