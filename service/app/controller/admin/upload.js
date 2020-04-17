'use strict'

const Controller = require('egg').Controller
const qiniu = require('qiniu')

class UploadController extends Controller {
  async getUploadToken() {
    const accessKey = 'bUrJXj_xf6jGAvqIrhZuVb4DG8mLG2FeLMWyl7R3'
    const secretKey = 'tIk5OxxA8BWlL_OCsyPMXAABE7uhAiPyH7WDjXoI'
    const options = {
      scope: 'blog535346881',
      expires: 7200,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    }
    // const url = 'http://q8qba8r0y.bkt.clouddn.com/'
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    if (uploadToken) {
      this.ctx.body = {
        code: 200,
        uptoken: uploadToken,
      }
    }
  }
}

module.exports = UploadController
