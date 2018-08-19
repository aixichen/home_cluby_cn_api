'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  async create(params) {
    let insert_data;
    insert_data.name = params.name;
    insert_data.mail = params.mail;
    insert_data.mobile = params.mobile;
    insert_data.password = params.password;
    insert_data.prefix = params.prefix;
    insert_data.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    insert_data.create_time = this.getNowTime();
    insert_data.update_time = this.getNowTime();
    const result = await this.app.mysql.insert('user', insert_data); // 更新 posts 表中的

    // 返回创建的 topic 的 id
    return result.affectedRows === 1;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
  getNowTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }
}

module.exports = UserService;
