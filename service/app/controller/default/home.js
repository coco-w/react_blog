'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello'
  }

  // 获取全部文章
  async getArticleList() {
    try {
      const size = this.ctx.query.pageSize
      const page = (this.ctx.query.page - 1) * size
      const countSql = `SELECT COUNT(*) as total FROM article`
      const res = await this.app.mysql.query(countSql)
      const sql = `
        SELECT article.id as id,
        article.title AS title,
        article.introduce AS introduce,
        article.create_time AS create_time,
        article.view_count AS viewCount,
        article_type.type_info AS type_info 
        FROM
          article
          LEFT JOIN article_type ON article.type = article_type.Id
        LIMIT ${size} OFFSET ${page}
      `
      console.log(sql)
      const results = await this.app.mysql.query(sql)    
      
      this.ctx.body = {
        data: results,
        total: res[0].total,
      }
      
    } catch (error) {
      this.ctx.body = {
        code: '400',
        msg: '查询失败'
      }
    }
  }
  // 根据id获取文章详细
  async getArticleById() {
    const id = this.ctx.params.id
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.create_time,'%Y-%m-%d %H:%i:%s' ) as create_time," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results,
    }
  }
  // 获取文章类型
  async getArticleType() {
    const results = await this.app.mysql.select('type')
    this.ctx.body = {
      data: results,
    }
  }
  // 根据类型获取文章
  async getArticleListById(ctx) {
    const id = ctx.params.id
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
      'article.view_count as viewCount ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results,
    }
  }
}

module.exports = HomeController
