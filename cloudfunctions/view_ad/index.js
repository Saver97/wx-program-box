// 云函数入口文件
const cloud = require('wx-server-sdk')
import { _enum, Map } from '../utils.js'
cloud.init()
const db = cloud.database({
  env: cloud.DYNAMIC_CURRENT_ENV
}) //取默认环境的数据库
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const docId = `${event.open_id}-user`
  let userRecord
  try {
    const querResult = await db.collection('user').doc(docId).get()
    userRecord = querResult.data
  } catch (err) {

  }
  if (userRecord) {
    if (userRecord._view_ad >= 10) {
      return {
        error_code: _enum.view_ad_over_limit
      }
    }
    userRecord._view_ad += 1
    
  }
}