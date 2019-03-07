// drop-down-menu

let data = {
  show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
  // selectData: ['1', '2', '3', '4', '5', '6'], //下拉列表的数据
  selectData: ['哈哈', '2', '3', '4', '5', '6'], //下拉列表的数据
  // selectData: ['1'], //下拉列表的数据
  index: 0 //选择的下拉列表下标
}

// 点击下拉显示框
function selectTap(that) {
  that.setData({
    show: !that.data.show
  });
}

// 点击下拉列表
function optionTap(that,event) {
  let index = event.currentTarget.dataset.index; //获取点击的下拉列表的下标
  console.log(index)
  that.setData({
    index,
    show: !that.data.show
  });
}


module.exports = {
  data, selectTap, optionTap
}