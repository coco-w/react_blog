'use strict'

const Controller = require('egg').Controller

class AdminController extends Controller {
  async login() {
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    const sql = `
      SELECT user.userName as userName
      FROM user 
      WHERE user.userName='${userName}' AND user.password = '${password}'
    `
    console.log(sql)
    const results = await this.app.mysql.query(sql)
    console.log(results)
    if (results.length > 0) {
      this.ctx.body = {
        code: '200',
        data: results[0],
      }
    } else {
      this.ctx.body = {
        code: '400',
      }
    }
  }
}

module.exports = AdminController
