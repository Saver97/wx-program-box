const app = getApp();
const lib=require('../../utils/aboutUsers.js');
let bStopDur=null;
Page({
  data: {
      othersXcx:null,
      imgUrls: [],
  },
  onLoad: function () {
      let that=this;
      lib.getAds(that);
  },
  onPullDownRefresh(){
      let that=this;
      lib.getAds(that);
      wx.stopPullDownRefresh()
  },
  getPhoneNumber: function(e) {
        console.log(e.detail.errMsg);
        console.log(e.detail.iv);
        console.log(e.detail.encryptedData);
        wx.request({
            url:'https://xcx5.zhuozhida.cn/decryptOpenGId',
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
                appId:'wx327002b0ffe1dd9d',
                sessionKey:app.sessionKey,
                encryptedData:e.detail.encryptedData,
                iv:e.detail.iv
            },
            success(res){
                console.log(res.data)
            }
        })
  },
  onShow(){
      if(app.bEnterXcx){
          console.log(app.durationTime);
          app.bEnterXcx=false;
      }
  },
  onHide(){
     if(app.bEnterXcx){
         bStopDur=setInterval(()=>{
             app.durationTime++;
         },1000)
     }
  },
  onShareAppMessage(e) {
      let img=e.target.dataset.img;
      let title=e.target.dataset.title;
      return lib.shareXcx(app,img,title)
  }
})
