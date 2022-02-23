'use strict';
// 仓库
const Controller = require('egg').Controller;

class StorageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
  }
  /**
   * 入库 = 买入
   */
  async inStorage() {
    const { ctx } = this;
    ctx.body = ' in storage ';
  }

  /**
   * 出库 = 卖出
  */
  async outStorage() {
    const { ctx } = this;
    ctx.body = '卖出';
  }

  /**
   * 查询库内商品有多少种
  */
  async productCount() {
    const { ctx, service } = this;
    const result = await service.storage.productCount(JSON.parse(ctx.query.data));
    ctx.body = result;
  }

  /**
   * 分页查询商品
  */
  async products() {
    const { ctx, service } = this;
    const result = await service.storage.products(JSON.parse(ctx.query.data));
    ctx.body = result;
  }

  /**
   * 添加商品
  */
  async addProduct() {
    const { ctx, service, reqBody } = this;
    const result = await service.storage.addProduct(reqBody);
    ctx.body = result;
  }

  /**
   * 删除商品
   */
  async delProduct() {
    const { ctx, service, reqBody } = this;
    const result = await service.storage.delProduct(reqBody);
    ctx.body = result;
  }

  /**
   * 修改商品信息
   */
  async editProduct() {
    const { ctx, service, reqBody } = this;
    const result = await service.storage.editProduct(reqBody);
    ctx.body = result;
  }
}

module.exports = StorageController;
