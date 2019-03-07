module.exports = {
  inputChange, collegesChange, sexChange, agreeChange
}
function inputChange(event, that) {
  // console.log(e);
  let value = event.detail.value
  let index = Number(event.target.id)
  // console.log(index, 'index')
  // console.log(typeof index, 'index')
  let regExp = [
    /^[^\x00-\xff]{2,5}$/, // 匹配姓名
    /^\d{10}$/, // 匹配账号
    /^[a-zA-Z0-9]{6,16}$/, // 匹配密码
    /^[^\x00-\xff]{3,12}$/, // 匹配学院
    /^[^\x00-\xff]{2,20}$/ // 匹配专业
  ]


  let flag = regExp[index].test(value)

  let topTips = [
    ["请输入姓名", "姓名长度错误"],
    ["请输入学号", "学号格式错误"],
    ["请输入密码", "密码格式错误"],
    ["请输入你的学院", "学院格式错误"],
    ["请输入你的专业", "专业格式错误"],
  ]

  if (value == '') showTopTips(that, topTips[index][0])
  else if (!flag) showTopTips(that, topTips[index][1])
  else {
    that.setData({ showTopTips: false })
    switch (index) {
      // case '0': that.setData({ username: value }); break;
      // case '1': that.setData({ usernum: value }); break;
      // case '2': that.setData({ password: value }); break;
      // case '3': that.setData({ college: value }); break;
      // case '4': that.setData({ major: value }); break;
    }
  }

}

function collegesChange(event, that) {
  // console.log('country change', e.detail.value);
  let collegeIndex = Number(event.detail.value)
  that.setData({ collegeIndex: collegeIndex })
}

function sexChange(event, that) {
  // let sexIndex = Number(event.detail.value)
  // let sexArr = ["male", "female"]
  // that.setData({ sexIndex: sexIndex, sex: sexIndexArr[sexIndex] })

  let sex = ['女', '男']
  let value = Number(event.detail.value)
  let sexItems = that.data.sexItems

  for (let item of sexItems) { item.checked = item.value == value }
  that.setData({ sexItems: sexItems, sexIndex: value })
    console.log('当前选择为：', sex[value])
}

function agreeChange(event, that) {
  // console.log('picker major 发生选择改变，携带值为', e);
  let isAgree = !!(event.detail.value.length)
  that.setData({ isAgree: isAgree });
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