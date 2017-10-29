var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
let userInfo = wx.getStorageSync('userInfo');
// var username= app.globalData.userInfo.username;
Page({
  data:{
    orderList:[],
    userInfo:{}
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
        console.log(res.data.data);
        that.setData({
          orderList: res.data.data
        });
        console.log(that.data.orderList)
      }
    });
  },
  payOrder(event){
    var activityId = event.currentTarget.dataset.id;
   
    wx.redirectTo({
      url: '/pages/activityReport/activityReport?activityid=' + activityId,
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    let userInfo = wx.getStorageSync('userInfo');
    // if (userInfo && token) {
    //   app.globalData.userInfo = userInfo;
    //   app.globalData.token = token;
    // }
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})