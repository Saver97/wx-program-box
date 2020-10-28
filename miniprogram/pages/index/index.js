//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    mainImgUrl:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg',
    adsbtnImgUrl:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=276772730,3789231562&fm=26&gp=0.jpg",
    sliderValue:50,
    adsinfo:[{
      iconUrl:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=276772730,3789231562&fm=26&gp=0.jpg",
      lookadsimgUrl:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=276772730,3789231562&fm=26&gp=0.jpg",
      adsTitle:"这是广告标题1",
      adsTips:"广告提示"
    },
      {
      iconUrl:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=276772730,3789231562&fm=26&gp=0.jpg",
      lookadsimgUrl:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=276772730,3789231562&fm=26&gp=0.jpg",
      adsTitle:"这是广告标题2",
      adsTips:"广告提示2"
    }
  ]
  },
  adsbtn:function()
  {
    console.log("看广告")
  },
  lookads: function(e)
  {
    console.log(e)
    console.log("看广告")
  }
,
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      console.log(this.data.userInfo)
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({//页面跳转
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  },

})
