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
}
module.exports = {
    getAds,
    getOpenId,
    shareXcx
}
