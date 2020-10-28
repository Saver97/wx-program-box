// pages/mr3/mr3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var animation=wx.createAnimation({
        delay: 0,
        duration:500,
        timingFunction:"ease",
      })
      this.animation=animation
      var next=true
      setInterval(function(){
        if(next){
          animation.translateX(4).step();
          animation.rotate(19).step();
          next=!next;
        }
        else{
          animation.translateX(-4).step();
          animation.rotate(-19).step();
          next=!next;
        }
        this.setData({
          animation:animation.export()
        })
      }.bind(this),300);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})