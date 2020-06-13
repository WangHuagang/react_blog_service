'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 数据库查询
    // const res  = await this.app.mysql.get('blog_content',{})
    // console.log(res)
    ctx.body = '2';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,'+
                'article.introduce as introduce,'+
                "article.addTime as addTime ,"+
                'article.view_count as view_count,'+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.id ORDER BY addTime DESC'

    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data: results}
  }

  async getArticleById() {

    let id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.article_content as content,'+
                "article.addTime as addTime ,"+
                'article.view_count as view_count,'+
                'type.typeName as typeName ,'+
                'type.id as typeId '+
                'FROM article LEFT JOIN type ON article.type_id = type.id '+
                'WHERE article.id ='+id

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {data: result}
    
  }

  //获取文章类别
  async getType() {
    const res = await this.app.mysql.select('type')
    this.ctx.body = {data: res}
  }

  //根据文章ID获取列表
  async getListById() {
    let idx = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,'+
                'article.introduce as introduce,'+
                "article.addTime as addTime ,"+
                'article.view_count as view_count,'+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.id '+
                'WHERE type_id =' +idx

    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data: results}
  }

  
}

module.exports = HomeController;
