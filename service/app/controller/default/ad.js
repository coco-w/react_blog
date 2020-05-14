'use strict'

const Controller = require('egg').Controller

class ADController extends Controller {
  async getAD() {
    const sql = `
    SELECT
      * 
    FROM
      ad 
    WHERE
      ad.DELETE = 1
    `
    try {
      const results = await this.app.mysql.query(sql)
      this.ctx.body = {
        data: results,
      }
    } catch (error) {
      this.ctx.body = {
        code: '400',
        msg: '查询失败',
      }
    }
  }


}

module.exports = ADController
