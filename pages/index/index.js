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
      wx.showLoading({
          title: '刷新中',
      })
      lib.getAds(that);
      wx.stopPullDownRefresh();
  },
  getPhoneNumber: function(e) {
        if(e.detail.iv){
            lib.getUserPhone(e,app)
        }

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
