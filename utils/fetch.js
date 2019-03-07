let api = require('./api.js')
module.exports = {
  postData: postDataCommon,
  getData: getDataCommon,
}

//通用的POST接口
function postDataCommon(posturl, postdata, cb, fail_cb) {
  wx.request({
    url: posturl,
    method: 'POST',
    data: postdata,
    success: function(res) {
      typeof cb == 'function' && cb(res.data)
    },
    fail: function(res) {
      typeof fail_cb == 'function' && fail_cb(res)
    }
  })
}

//通用的GET接口
function getDataCommon(geturl, getdata, cb, fail_cb) {
  wx.request({
    url: geturl,
    method: 'GET',
    data: getdata,
    success: function(res) {
      typeof cb == 'function' && cb(res.data)
    },
    fail: function(res) {
      typeof fail_cb == 'function' && fail_cb(res)
    }
  })
}