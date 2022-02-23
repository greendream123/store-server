'use strict';
// 销售
const Controller = require('egg').Controller;

class SaleController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
  }

  /**
   * gather 收款 = 出货
   */

  async gather() {
    const { ctx } = this;
    ctx.body = 'user';
  }

  /**
   * payment 付款 = 退货
  */
  async payment() {
    const { ctx } = this;
    ctx.boxy = '退货';
  }

  /**
   * saleInfos 获取销售记录 形成销售统计图
   */
  async saleInfos() {
    const { ctx, service } = this;
    const result = await service.sale.saleInfos(JSON.parse(ctx.query.data));
    ctx.body = result;
  }

  /**
   * yearSale 获取年比
   */
  async yearSale() {
    const { ctx, service } = this;
    const result = await service.sale.yearSale(JSON.parse(ctx.query.data));
    ctx.body = result;
  }

  /**
   * years 获取有销售记录的年份[]
   */
  async years() {
    const { ctx, service } = this;
    const result = await service.sale.years();
    ctx.body = result;
  }

  /**
   * saleLogCount 获取销售日志数量
   */
  async saleLogCount() {
    const { ctx, service } = this;
    const result = await service.sale.saleLogCount();
    ctx.body = result;
  }

  /**
   * saleLogs 获取销售日志
   */
  async saleLogs() {
    const { ctx, service } = this;
    const result = await service.sale.saleLogs(JSON.parse(ctx.query.data));
    ctx.body = result;
  }
}

module.exports = SaleController;

