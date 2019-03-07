module.exports = { register, login }

function login(that, event, callback) {

  let value = event.detail.value
  let topTips = ["请输入账号", "请输入密码", "请认真阅读小程序使用声明"]

  if (!value.username) showTopTips(that, topTips[0])
  else if (!value.password) showTopTips(that, topTips[1])
  else {
    console.log("登录 验证通过")
    // 所有必须条件均成立，执行登录注册操作
    typeof callback == 'function' && callback(event)

  }
}

function register(that, event, callback) {

  let value = event.detail.value
  let topTips = ["请输入姓名","请输入账号", "请输入密码", "请输入你的学院", "请输入你的专业", "请认真阅读小程序使用声明"]
  if (!value.username) showTopTips(that, topTips[0])
  else if (!value.username) showTopTips(that, topTips[0])
  else if (!value.password) showTopTips(that, topTips[1])
  else if (!value.college) showTopTips(that, topTips[2])
  else if (!value.major) showTopTips(that, topTips[3])
  else if (!value.isAgree.length) showTopTips(that, topTips[4])
  else typeof callback == 'function' && callback(event)

  //  {
  //   console.log("注册 验证通过")
  //   // 所有必须条件均成立，执行登录注册操作

  // }
}

function showTopTips(that, topTips) {
  that.setData({
    showTopTips: true,
    topTips: topTips
  });

  setTimeout(function () {
    that.setData({
      showTopTips: false
    });
  }, 1000);
}