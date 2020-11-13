// 云函数入口文件
const cloud = require('wx-server-sdk')
import { _enum } from '../dependency/utils.js'
import { _sign_award } from '../dependency/config.js'
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
    userRecord._sign_day += 1
    var item = _sign_award[userRecord._sign_day]
    if (item) {
      if (item[1] == 1) {
        userRecord._gold += item[2]
      } else if (item[1] == 2) {
        userRecord._food += item[2]
      } else {
        console.log("config error")
        return {
          error_code: _enum.config_error
        }
      }
    } else {
      return {
        error_code: _enum.no_sign_award
      }
    }
    const updateResult = await db.collection('user').doc(userRecord._id).update({
      data: {
        _sign_day: userRecord._sign_day,
        _food: userRecord._food,
        _gold: userRecord._gold,
      }
    })
    if (updateResult.stats.updated != 0) {
      const updateResult = await db.collection('scorekeeping').doc(userRecord._id).update({
        data: {
          _sign_day: _.inc(1)
        }
      })
      return {
        _sign_day: userRecord._sign_day,
        _food: userRecord._food,
        _gold: userRecord._gold,
      }
    } else {
      return {
        error_code: _enum.sql_query_error
      }
    }
  }
}