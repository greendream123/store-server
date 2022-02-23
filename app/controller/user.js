'use strict';
// user Controller
const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    // this.service = ctx.service;
    this.reqBody = ctx.request.body;
  }

  /**
   * login
   */

  async login() {
    const { ctx, service, reqBody } = this;
    const result = await service.user.login(reqBody);
    if (result.code === 0) {
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  }

  /**
   * getAccounts
   */
  async accounts() {
    const { ctx, service } = this;
    const result = await service.user.accounts();
    if (result.code === 0) {
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  }

  /**
   * addAccount
   */
  async addAccount() {
    const { ctx, service, reqBody } = this;
    const result = await service.user.addAccount(reqBody);
    if (result.code === 0) {
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  }

  /**
   * editAccount
   */
  async editAccount() {
    const { ctx, service, reqBody } = this;
    const result = await service.user.editAccount(reqBody);
    if (result.code === 0) {
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  }

  /**
   * delAccount
   */
  async delAccount() {
    const { ctx, service, reqBody } = this;
    const result = await service.user.delAccount(reqBody);
    if (result.code === 0) {
      ctx.body = result;
    } else {
      ctx.body = result;
    }
  }
}

module.exports = UserController;
