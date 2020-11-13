// 云函数入口文件
const cloud = require('wx-server-sdk')
import { _enum, Map, add_item } from '../dependency/utils.js'
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) //取默认环境的数据库
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const docId = event.id
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
    if (userRecord._view_ad >= 10) {
      return {
        error_code: _enum.view_ad_over_limit
      }
    }
    userRecord._view_ad += 1
    userRecord._food += 10//看广告增加的猫粮数量再议
    const updateResult = await db.collection('user').doc(userRecord._id).update({
      data: {
        _view_ad: userRecord._view_ad,//看广告次数
        _food: userRecord._food,
      }
    })
    if (updateResult.stats.updated != 0) {
      const updateResult = await db.collection('scorekeeping').doc(userRecord._id).update({
        data: {
          _view_ad: _.inc(1)
        }
      })
      return {
        _view_ad: userRecord._view_ad,
        _food: userRecord._food,
      }
    } else {
      return {
        error_code: _enum.sql_query_error
      }
    }
  }
}