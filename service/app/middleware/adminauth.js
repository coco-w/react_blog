'use strict'
const lib = require('../lib/admin')

module.exports = () => {
  return async function adminauth(ctx, next) {
    const token = ctx.request.header.token
    const userName = ctx.request.header.user
    try {
      const res = await lib.testToken(token, 'key')

      if (token && userName === res) {
        await next()
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: '401',
        data: null,
        msg: '没有登录',
      }
    }
  }
}
