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
  async updateAD() {
    const ADs = this.ctx.request.body
    console.log(this.ctx.request.body)
    try {
      const res = await this.app.mysql.update('ad', ADs)
      const updateSuccess = res.affectedRows === 1
      this.ctx.body = {
        code: '200',
        isSuccess: updateSuccess,
      }
    } catch (error) {
      console.log(error)
      this.ctx.body = {
        code: '400',
        msg: '修改失败',
      }
    }
  }

}

module.exports = ADController
