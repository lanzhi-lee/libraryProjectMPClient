// const url = 'http://fwt.lovedcl.com:7777'

const url = 'https://library.henutms.cn'

module.exports = {
  user: {
    adduser: url + '/user/addUser', //注册
    login: url + '/user/login', //登录
    // all: url + '/user/all', //获取所有用户
    // user: url + '/user/user', //获取用户个人信息
    msg: url + '/user/order/msg',//获取用户当前占座信息
    history: url + '/user/order/history' //获取用户历史占座信息
  },
  location: {
    all: url + '/location/all', //获取所有阅览室信息
    delete: url + '/location/delete', //逻辑删除座位
    // room: url + '/location/room' //获取某阅览室所有座位信息（无座位状态，较少使用）
  },
  seat: {
    order: url + '/seat/order', //占座
    finish: url + '/seat/order/finish', //手动结束占座
    orders: url + '/seat/room/orders', //获取某阅览室所有座位信息
    msg: url + '/seat/order/msg' //获取某座位占座信息
  }
}