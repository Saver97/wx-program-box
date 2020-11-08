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

function if_same_day(t1,t2,hour){
  var date = new Date()
  var y = date.getUTCFullYear(t1) 
  var m = date.getUTCMonth(t1)
  var d = date.getUTCDate(t1)
  
}



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
    //TODO: 计算收益 重置记录等


    return {
      userRecord: userRecord
    }
  } else {
    db.collection('user').add({
      data: {
        _id: docId,
        _openid: event.open_id,
        _lv: 1,
        _gold: 0,
        _rmb: 0,
        _item: {},
        _sign_day: 0,
        _view_ad: 0,
        _invite: 0,
        _wait_gold: {},
        _creat_time: new Date().getTime(),
        _refresh_sec: 0,
        _feed_sec: 0,
      },
    }).then(res => {
      console.log(res)
    })
    const querResult = await db.collection('user').doc(docId).get()
    if (querResult.data) {
      return {
        userRecord: querResult.data
      }
    }
  }
}