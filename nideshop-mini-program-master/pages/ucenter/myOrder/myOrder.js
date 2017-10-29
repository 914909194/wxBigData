var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data:{
    orderList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getOrderList();
  },
  getOrderList(){
    let that = this;
    var userid = app.globalData.userInfo.id;
    console.log(userid);
    util.request(api.OrderList,{userid:userid}).then(function (res) {
      if (res.errno === 0) {
        // console.log(res.data.data);
        that.setData({
          orderList: res.data.data
        });
      }
    });
  },
  //取消订单
  cancellOrder(event){
    let that = this;
    var userid = app.globalData.userInfo.id;
    var activityapplyid = event.currentTarget.dataset.cancellorder
    util.request(api.CancellOrder, { userid: userid, activityapplyid: activityapplyid}).then(function (res) {
      if (res.errno === 0) {
        // console.log(res.data.data);
        that.setData({
          orderList: res.data.data
        });
      }
    });
  

  },
  //跳转付款页面
  payOrder(event){
    var activityId = event.currentTarget.dataset.id;
    console.log(activityId);
    wx.redirectTo({
      url: '/pages/activityReport/activityReport?activityid=' + activityId,
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})