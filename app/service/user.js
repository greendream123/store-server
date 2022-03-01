/* eslint-disable jsdoc/require-param */
'use strict';
// user Service
const Service = require('egg').Service;
const moment = require('moment');

class UserService extends Service {
  /**
   * 登录
  */

  async login(reqBody) {
    const { app, ctx } = this;
    const { username, password } = reqBody;
    const user = await app.mysql.get('userlist', { username });
    if (!user) {
      return { code: 1, desc: '用户不存在' };
    }
    if (password !== user.password) {
      return { code: 1, desc: '密码错误' };
    }
    const token = ctx.helper.getToken(reqBody);
    user.token = token;
    user.password = undefined;
    return { code: 0, desc: '登录成功', options: user };
  }

  /**
   * accounts
   */
  async accounts() {
    const { app } = this;
    const result = await app.mysql.select('userlist');
    if (!result) {
      return { code: 1, desc: '获取用户信息失败' };
    }
    // 处理显示时间
    result.forEach(account => {
      account.time = moment(account.time).format('YYYY-MM-DD HH:mm:ss');
    });
    return { code: 0, desc: '获取用户信息成功', options: result };
  }

  /**
   * addAccount
   */
  async addAccount(reqBody) {
    const { app } = this;
    reqBody.time = moment(reqBody.time).format('YYYY-MM-DD HH:mm:ss');
    const result = await app.mysql.insert('userlist', reqBody);
    if (result.affectedRows !== 1) {
      return { code: 1, desc: '添加用户失败' };
    }
    return { code: 0, desc: '添加用户成功' };
  }

  /**
   * editAccount
   */
  async editAccount(reqBody) {
    const { app } = this;
    reqBody.time = moment(reqBody.time).format('YYYY-MM-DD HH:mm:ss');
    const result = await app.mysql.update('userlist', reqBody);
    if (result.affectedRows !== 1) {
      return { code: 1, desc: '修改用户信息失败' };
    }
    return { code: 0, desc: '修改用户信息成功' };
  }

  /**
   * delAccount
   */
  async delAccount(reqBody) {
    const { app } = this;
    for (const id of reqBody) {
      const result = await app.mysql.delete('userlist', { id });
      if (result.affectedRows !== 1) { // 判断依据错误
        return { code: 1, desc: '删除用户信息失败' };
      }
    }
    return { code: 0, desc: '删除用户信息成功' };
  }

}

module.exports = UserService;
