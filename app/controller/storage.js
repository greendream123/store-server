'use strict';
// 仓库
const Controller = require('egg').Controller;
const fs = require('mz/fs');
// const path = require('path');
const sendToWormhole = require('stream-wormhole');
const common = require('../common');
const { Constant } = common;
const { PROJECT_FIELD } = Constant.PROJECT_FIELD;
const { UPLOAD_PATH } = PROJECT_FIELD.PATH;

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

  /**
   * 上传示例图片
   */
  async uploadPicture() {
    const { ctx } = this;
    // 获取文件对象 此对象包含所有上传携带信息  组件上传data = stream.fields
    const stream = await ctx.getFileStream();
    // 结果对象
    let result = {};
    await new Promise((resolve, reject) => {
      // 保存文件，或者使用文件流做别的事情
      const ws = fs.createWriteStream(`${UPLOAD_PATH}${stream.fieldname}.png`);
      stream.pipe(ws);
      ws.on('finish', () => {
        resolve();
      });
      ws.on('error', err => {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        sendToWormhole(stream);
        reject(err);
      });
    }).then(() => {
      result = { code: 0, desc: '上传成功' };
    }).catch(err => {
      result = { code: 1, desc: err };
    });

    ctx.body = result;
  }
}

module.exports = StorageController;
