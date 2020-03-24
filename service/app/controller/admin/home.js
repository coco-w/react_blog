'use strict'

const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
const lib = require('../../lib/admin')

class AdminController extends Controller {
  async login() {
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    const sql = `
      SELECT user.userName as userName
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
  
  async test() {
    const token = this.ctx.request.header.token
    const userName = this.ctx.request.header.user        
    lib.testToken(token,'key').then(res => {
      console.log(res)
      console.log(userName, userName == res)
      if (token && userName == res) {
        this.ctx.body = {
          code: '200',
          data: undefined,
          msg: 'token测试成功'
        }
      }else {
        this.ctx.body = {
          code: '401',
          data: undefined,
          msg: '没有登录'
        }
      }
    })
    
  }  
}

module.exports = AdminController
