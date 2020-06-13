'use strict';
const Controller = require('egg').Controller;
// 文件存储
const fs = require('fs');
const path = require('path');
const pump= require('mz-modules/pump');
 
class HomeController extends Controller {
  async uploadImg() {
    let parts = this.ctx.multipart({ autoFields: true });
    let filename = ''
    let stream, img_list = [], name=''; // 图片访问地址集合
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      name = stream.filename;
      // 文件名为：时间戳+随机字符串+.文件后缀
      filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
      // 上传图片的目录
      let target = 'app/public/admin/upload/' + filename;
      img_list.push('/public/admin/upload/' + filename);
      let writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
    }
    const id = new Date().valueOf();
    const res = await this.app.mysql.insert('admin_picture', {url: '/public/admin/upload/' + filename, id,name})
    const isInsert = res.affectedRows === 1; // 代表有几行发生改变, 1行改变说明新增一条数据
    this.ctx.body = {
      isInsert,
      id,
      url: img_list,
      fields: parts.field
    }
  }
}
 
module.exports = HomeController;