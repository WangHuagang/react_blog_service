'use strict'

const Controller = require('egg').Controller 

class MainController extends Controller {
    async index() {
        const {ctx} = this;
        ctx.body = 'hello'
    }
    async checkLogin() {
        const userName = this.ctx.request.body.userName;
        const passWord = this.ctx.request.body.passWord;
        console.log(userName)
        // const sql = "SELECT userName FROM admin_user WHERE userName = " +userName + " AND passWord = "+passWord
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
        "' AND passWord = '"+passWord+"'"
        const res = await this.app.mysql.query(sql)
        if(res.length) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId': openId}
            this.ctx.body = {data: '登录成功', 'openId': openId}
        }else {
            this.ctx.body = {data: '登录失败'}
        }
    }
    async getTypeInfo() {
        const res = await this.app.mysql.select('type')
        this.ctx.body = {data: res}
    }

    async addArticle() {
        let tmpArticle = this.ctx.request.body;
        const res = await this.app.mysql.insert('article', tmpArticle)
        const isInsert = res.affectedRows === 1; // 代表有几行发生改变, 1行改变说明新增一条数据
        const insertId = res.insertId
        this.ctx.body = {
            isSuccess: isInsert,
            insertId
        }
    }

    async updateArticle () {
        let tmpArticle = this.ctx.request.body;
        const res = await this.app.mysql.update('article', tmpArticle)
        const status = res.affectedRows === 1; // 代表有几行发生改变
        this.ctx.body = {
            status
        }
    }

    async getArticleList () {
        const sql = 'SELECT article.id as id,' +
                'article.title as title,'+
                'article.introduce as introduce,'+
                "article.addTime as addTime ,"+
                'article.view_count as view_count,'+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'ORDER BY addTime DESC'
        const res = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: res
        }
    }

    async delArticle() {
        const id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', {'id': id})
        this.ctx.body = {
            data: res
        }
    }

    async getArticleById() {
        const id = this.ctx.params.id;
        const sql = 'SELECT article.id as id,' +
                'article.title as title,'+
                'article.introduce as introduce,'+
                "article.addTime as addTime ,"+
                'article.view_count as view_count,'+
                'article.article_content as article_content,'+
                'type.typeName as typeName '+
                // 'type.id as typeId '+
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id ='+id
        const res = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: res
        }
    }

    async addType() {
        const typeName = this.ctx.request.body.typeName;
        const res = await this.app.mysql.insert('type', {typeName, orderNum: 0})
        const isInsert = res.affectedRows === 1; // 代表有几行发生改变, 1行改变说明新增一条数据
        const insertId = res.insertId
        this.ctx.body = { isInsert, insertId }
    }

    async delType() {
        const delObj = this.ctx.request.body;
        const res = await this.app.mysql.delete('type',delObj)
        const isDel = res.affectedRows === 1; // 代表有几行发生改变, 1行改变说明新增一条数据
        this.ctx.body = { isDel }
    }

    async getPicture () {
        const res = await this.app.mysql.select('admin_picture')
        this.ctx.body = {
            data: res
        }
    }

    async updatePic () {
        let picture = this.ctx.request.body;
        const res = await this.app.mysql.update('admin_picture', picture)
        const status = res.affectedRows === 1; // 代表有几行发生改变
        this.ctx.body = {
            status
        }
    }

    async delPic () {
        const delObj = this.ctx.request.body;
        const res = await this.app.mysql.delete('admin_picture',delObj)
        const isDel = res.affectedRows === 1; // 代表有几行发生改变, 1行改变说明新增一条数据
        this.ctx.body = { isDel }
    }

    async getCount () {
        const articleRes = await this.app.mysql.select('article')
        const typeRes = await this.app.mysql.select('type')
        const pictureRes = await this.app.mysql.select('admin_picture')
        this.ctx.body = {
            articleCount: articleRes.length,
            typeCount: typeRes.length,
            pictureCount: pictureRes.length,
        }
    }
}
module.exports =  MainController