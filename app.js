// app.js
wx.cloud.init({
  env:'cloud1-9g75fmfg7c95505a'
})

App({
  
  onLaunch() {
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'add',
    //   // 传给云函数的参数
    //   data: {
    //     a: 'https://v.douyin.com/AnpEAMq/'
    //   },
    //   success: function(res) {
    //     console.log(res.result) // 3
    //     var r = res.result
    //     //console.log(r.response.headers.location);
    //   },
    //   fail: console.error
    // })
  
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
