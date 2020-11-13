// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) //取默认环境的数据库
const _ = db.command
// 云函数入口函数

exports.main = async (event, context) => {
  //创建记录为openid-user
  console.log(event)
  const docId = `${event.open_id}-user`
  let userRecord
  try {
    const querResult = await db.collection('user').doc(docId).get()
    userRecord = querResult.data
  } catch (err) {

  }
  if (userRecord) {
    var cur_time = new Date().getTime()
    var flag = false
    if (userRecord._last_feed_sec > 0) {
      flag = true
      var time_diff = cur_time - userRecord._feed_sec
      userRecord._last_feed_sec -= time_diff
      if (userRecord._last_feed_sec < 0) {
        time_diff = userRecord._last_feed_sec
        userRecord._last_feed_sec = 0
        userRecord._feed_sec = 0
      }
      var gold = time_diff / 1000 //TODO 等级系数 下线数量等 公式需要另算
      userRecord._gold += gold
    }
    //TODO: 计算收益 重置记录等
    if (cur_time > userRecord._refresh_sec) {
      flag = true
      userRecord._view_ad = 0
      userRecord._invite = 0
      userRecord._refresh_sec = cur_time
    }
    if (flag) {
      const updateResult = await db.collection('user').doc(userRecord._id).update({
        data: {
          _sign_day: userRecord._sign_day,//签到天数
          _view_ad: userRecord._view_ad,//看广告次数
          _invite: userRecord._invite,//邀请人数
          _refresh_sec: userRecord._refresh_sec,//刷新的记录时间戳
          _last_feed_sec: userRecord._last_feed_sec,
          _gold: userRecord._gold,
          _feed_sec: userRecord._feed_sec,
        }
      }).then(res => {
        console.log(res)
      })
    }
    return {
      userRecord: userRecord
    }
  } else {
    db.collection('user').add({
      data: {
        _id: docId,
        _openid: event.open_id,
        _lv: 1,
        _gold: 0,//金币
        _rmb: 0,
        _item: new Array(),//道具
        _sign_day: 0,//签到天数
        _view_ad: 0,//看广告次数
        _invite: 0,//邀请人数
        _refresh_sec: new Date().getTime(),//刷新的记录时间戳
        _wait_gold: new Array(),//等待收获的金币 {number=,log=}
        _creat_time: new Date().getTime(),//创建时间
        _feed_sec: 0,//喂食的时间点
        _last_feed_sec: 0,//喂食的持续时间
        _food: 0,//猫粮数量
      },
    }).then(res => {
      db.collection('scorekeeping').add({
        _id: docId,
        _sign_day: 0,//签到天数
        _view_ad: 0,//看广告次数
        _invite: 0,//邀请人数
        _creat_time: new Date().getTime(),//创建时间
      })
    })
    try {
      const querResult = await db.collection('user').doc(docId).get()
      if (querResult.data) {
        return {
          userRecord: querResult.data
        }
      }
    } catch (error) {

    }
  }
}