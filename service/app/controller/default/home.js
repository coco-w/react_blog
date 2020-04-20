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
      const countSql = 'SELECT COUNT(*) as total FROM article WHERE article.deleted=1'
      const res = await this.app.mysql.query(countSql)
      const sql = `
        SELECT 
          article.id as id,
          article.title AS title,
          article.introduce AS introduce,
          article.create_time AS create_time,
          article.view_count AS viewCount,
          article_type.type_info AS type_info 
        FROM
          article
          LEFT JOIN article_type ON article.type = article_type.Id        
        WHERE 
          article.deleted = 1
        ORDER BY create_time DESC
        LIMIT ${size} OFFSET ${page}        
      `
      const results = await this.app.mysql.query(sql)      
      this.ctx.body = {
        data: results,
        total: res[0].total,
      }
    } catch (error) {
      this.ctx.body = {
        code: '400',
        msg: '查询失败',
      }
    }
  }
  // 根据id获取文章详细
  async getArticleById() {
    const id = this.ctx.params.id ? this.ctx.params.id : this.ctx.query.id
    const ip = this.ctx.request.ip
    const ipSql = `
      SELECT
        count(*) AS count,
        ip_view__count.time AS time,
        ip_view__count.id AS id
      FROM
        ip_view__count 
      WHERE
        ip_view__count.address = '${ip}' 
        AND ip_view__count.article_id = '${id}'
    `
    const nowTime = new Date().getTime()
    const sql = `
      SELECT
        article.id AS id,
        article.title AS title,
        article.introduce AS introduce,
        article.content AS content,
        article.create_time AS create_time,
        article.view_count AS view_count,
        article.contentMD AS contentMD,
        article.introduceMD AS introduceMD,
        article_type.type_info AS type_info,
        article_type.id AS typeId
      FROM
        article
        LEFT JOIN article_type ON article.type = article_type.Id 
      WHERE
        article.id = ${id}
    `
    try {
      const results = await this.app.mysql.query(sql)
      this.ctx.body = {
        data: results,
      }
      const res = await this.app.mysql.query(ipSql)
      const temp = {
        id: results[0].id,
        view_count: results[0].view_count,
      }
      const temp2 = {
        id: res[0].id,
        time: nowTime,
      }
      temp.view_count++
      if (res[0].count !== 0) {
        if (nowTime - res[0].time > 1800000) {
          this.app.mysql.update('article', temp)
          this.app.mysql.update('ip_view__count', temp2)
        }
      } else {
        const obj = {
          time: nowTime,
          address: ip,
          article_id: id,
        }
        this.app.mysql.insert('ip_view__count', obj)
        this.app.mysql.update('article', temp)
      }
    } catch (error) {
      console.log(error)
      this.ctx.body = {
        code: '400',
        msg: '查询失败',
      }
    }
  }
  // 获取文章类型
  async getArticleType() {
    const results = await this.app.mysql.select('article_type')
    this.ctx.body = {
      data: results,
    }
  }
  // 根据类型获取文章
  async getArticleListById(ctx) {
    const id = ctx.params.id
    const sql = `
    SELECT 
      article.id as id,
      article.title AS title,
      article.introduce AS introduce,
      article.create_time AS create_time,
      article.view_count AS viewCount,
      article_type.type_info AS type_info 
    FROM
      article
      LEFT JOIN article_type ON article.type = article_type.Id        
    WHERE 
      article.deleted = 1 AND article.type = ${id}
    
    `
    const typeSql = `
      SELECT * FROM article_type WHERE id = '${id}'
    `
    try {
      const results = await this.app.mysql.query(sql)
      const res = await this.app.mysql.query(typeSql)
      this.ctx.body = {
        data: results,
        typeInfo: res[0].type_info,
      }
    } catch (error) {
      this.ctx.body = {
        code: '400',
        msg: '查询失败',
      }
    }
  }

}

module.exports = HomeController
