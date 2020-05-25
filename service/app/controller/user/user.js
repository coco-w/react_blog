'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async getUserInfo() {
    const sql = `
      SELECT
        user.avatar as avatar,
        user.userName as userName,
        user.introduce as introduce,
        user.socialAccount as socialAccount
      FROM
      user
    `
    try {
      const results = await this.app.mysql.query(sql)
      const r = results[0]
      this.ctx.body = {
        code: '200',
        data: {
          ...r,
        },
      }
    } catch (error) {
      this.ctx.body = {
        code: '400',
        msg: '查询失败',
      }
    }
  }
}

module.exports = UserController
