// 云函数入口文件
const cloud = require('wx-server-sdk')
import { _enum } from '../utils.js'
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) //取默认环境的数据库
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const docId = event.id
  const used_food = event.food
  let userRecord
  try {
    const querResult = await db.collection('user').doc(docId).get()
    userRecord = querResult.data
  } catch (err) {
    return {
      error_code: _enum.sql_query_error
    }
  }
  if (userRecord) {
    if (userRecord._food <= 0) {
      return {
        error_code: _enum.view_ad_over_limit
      }
    }
    if (used_food > userRecord._food) {
      used_food = userRecord._food
    }
    userRecord._food -= used_food
    userRecord._feed_sec = new Date().getTime()
    userRecord._last_feed_sec = used_food*100 //猫粮可以带来的生成金币的持续时间待定
    const updateResult = await db.collection('user').doc(userRecord._id).update({
      data: {
        _feed_sec: userRecord._feed_sec,
        _food: userRecord._food,
        _last_feed_sec: userRecord._last_feed_sec,
      }
    })
    if (updateResult.stats.updated != 0) {
      return {
        _feed_sec: userRecord._feed_sec,
        _food: userRecord._food,
        _last_feed_sec: userRecord._last_feed_sec,
      }
    } else {
      return {
        error_code: _enum.sql_query_error
      }
    }
  }
}