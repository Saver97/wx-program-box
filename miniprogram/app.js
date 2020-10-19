//app.js
const lib=require('./utils/aboutUsers.js');
App({
  onLaunch: function () {
    let that=this;
    wx.login({
        success(res){
            lib.getOpenId(that,res.code)
        }
    })
  },
  globalData: {
    userInfo:null,
    openId:null
  },
  durationTime:0,
  bEnterXcx:false,
  sessionKey:null

})