function getAds(that){
    //获取广告位
    wx.request({
        url:`https://xcx5.zhuozhida.cn/checkin/getAds`,
        header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:{

        },
        success(res){
            that.setData({
                imgUrls:res.data
            })
        }
    })
    //获取其他小程序
    wx.request({
        url:`https://xcx5.zhuozhida.cn/checkin/getOthers`,
        header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:{

        },
        success(res){
            let arr=res.data.filter((item)=>{
                return item.name!=='福利盒'
            })
            wx.hideLoading();
            that.setData({
                othersXcx:arr
            })
        }
    })
};
function getOpenId(that,code){
    wx.request({
        url: 'https://xcx5.zhuozhida.cn/getOpenId',
        data: {
            code:code,
            appId:'wx327002b0ffe1dd9d',
            secret:'ef1bdfa9b2fe5acf67569f07e558d373'
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            that.sessionKey=JSON.parse(res.data).session_key;
            that.globalData.openId=JSON.parse(res.data).openid
        }
    })
};

function getUserData(that,app,srcOpenId){
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://xcx5.zhuozhida.cn/box/login',
            data: {
                openId:app.globalData.openId,
                name:app.globalData.userInfo.nickName,
                userImg:app.globalData.userInfo.avatarUrl,
                srcOpenId:srcOpenId
            },
            success: function(res) {
                console.log('返回数据是')
                console.log(res.data);
                resolve(app)
            }
        })
    })
};
function checkIn(app){
  wx.request({
      url:'https://xcx5.zhuozhida.cn/box/checkIn',
      data:{
         openId:app.globalData.openId,
         name:app.globalData.userInfo.nickName
      },
      success(res){
          console.log(res)
      }
  })
};
function shareXcx(app,img,title){
    return {
        title:`@我,${title}`,
        path: `/pages/index/index?srcOpenId=${app.globalData.openId}`,
        imageUrl:img,
        success: function(res) {
            wx.showToast({
                title: '转发成功',
                icon: 'success',
                duration:1000
            });
        },
        fail: function(res) {
            wx.showToast({
                title: '请点击转发哦',
                icon: 'none',
                duration:1000
            });
        }
    }
};
function getUserPhone(e,app){
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
}

module.exports = {
    getAds,
    getOpenId,
    shareXcx,
    getUserPhone,
    getUserData,
    checkIn
}
