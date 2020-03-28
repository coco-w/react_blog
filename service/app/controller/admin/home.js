'use strict'

const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
const lib = require('../../lib/admin')
const moment = require('moment')
class AdminController extends Controller {
  async login() {
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    const sql = `
      SELECT user.userName as userName,
      user.id as id
      FROM user 
      WHERE user.userName='${userName}' AND user.password = '${password}'
    `    
    const results = await this.app.mysql.query(sql)    
    if (results.length > 0) {
      const tk = jwt.sign({msg: results[0]}, 'key')
      this.ctx.body = {
        code: '200',
        data: results[0],
        token: tk
      }
    } else {
      this.ctx.body = {
        code: '400',
      }
    }
  }
  
  async getTypeInfo() {
    const res = await this.app.mysql.select('article_type') 
    // console.log(res)
    this.ctx.body = {
      code: '200',
      data: res      
    }
  }  

  async addArticle() {
    const article = this.ctx.request.body
    article.create_user = this.ctx.request.header.user_id
    article.create_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    article.view_count = 0
    try {
      const result = await this.app.mysql.insert('article', article)
      const insertType = result.affectedRows === 1
      const insertId= result.insertId
      this.ctx.body = {
        code: '200',
        isSuccess: insertType,
        inserId: insertId
      }
    } catch (error) {
      this.ctx.body = {
        code: '400',
        msg: '添加文章失败'
      }
    }
    
  }
}

module.exports = AdminController
