// module.exports = { getCampusList, getStoreysList, getRegionsList, getRegionsMap }
module.exports = { ParseForPicker, getRegionsKeyMap, getAllIdMap }

function ParseForPicker(data) {
  let targetData = {}
  targetData.campus = getCampusList(data)
  targetData.buildingsMap = getBuildingsMap(data)
  targetData.storeysMap = getStoreysMap(data)
  targetData.regionsMap = getRegionsMap(data)

  return targetData
}

function getAllIdMap(currentData) {
  let campusMap = new Map()
  let buildingMap = new Map()
  let storeyMap = new Map()
  let roomMap = new Map()

  for (let campus of currentData) {
    // console.log(campus)
    campusMap.set(campus.id, campus.name)
    for (let building of campus.buildings) {
      // console.log(building)
      buildingMap.set(campus.id + building.id, building.name)
      for (let storey of building.storeys) {
        // console.log(storey)
        storeyMap.set(campus.id + building.id + storey.id, storey.name)
        for (let room of storey.rooms) {
          // console.log(room)
          roomMap.set(room.id, room.name)
        }
      }
    }
  }
  // console.log({ campusMap, buildingMap, storeyMap, roomMap })
  return { campusMap, buildingMap, storeyMap, roomMap }
}

function getRegionsKeyMap(currentData) {
  let targetData = new Map()

  for (let campus of currentData) {
    for (let building of campus.buildings) {
      for (let storey of building.storeys) {
        for (let room of storey.rooms) {
          targetData.set(room.name, room.id)
        }
      }
    }
  }
  // console.log(targetData)
  return targetData
}

function getRegionsMap(currentData) {
  let targetData = new Map()

  for (let campus of currentData) {
    for (let building of campus.buildings) {
      for (let storey of building.storeys) {
        let detailName = building.name + storey.name
        targetData.set(storey.name, [])
        for (let room of storey.rooms) {
          targetData.get(storey.name).push(room.name)
        }
      }
    }
  }
  // console.log(targetData)
  return targetData
}

function getStoreysMap(currentData) {
  let targetData = new Map()
  for (let campus of currentData) {
    for (let building of campus.buildings) {
      targetData.set(building.name, [])
      for (let storey of building.storeys) {
        targetData.get(building.name).push(storey.name)
      }
    }
  }
  // console.log(targetData)
  return targetData
}

function getBuildingsMap(currentData) {
  // console.log(currentData)
  let targetData = new Map()
  for (let campus of currentData) {
    targetData.set(campus.name, [])
    for (let building of campus.buildings) {
      targetData.get(campus.name).push(building.name)
    }
  }
  // console.log(targetData)
  return targetData
}

function getCampusList(currentData) {
  let targetData = []
  for (let temp of currentData) {
    targetData.push(temp.name)
  }
  return targetData
}


