/* eslint-disable jsdoc/require-param */
'use strict';
// storage Service
const Service = require('egg').Service;
const moment = require('moment');

class storageService extends Service {
  /**
   * 查询库内商品有多少种
  */
  async productCount(reqQuery) {
    const { app } = this;
    const products = await app.mysql.select('storage', { where: reqQuery });
    if (!products) {
      return { code: 1, desc: '查询失败' };
    }
    return { code: 0, desc: '查询成功', options: products.length };
  }

  /**
   * 分页查询商品
  */
  async products(reqQuery) {
    const { app } = this;
    const { currentPage, currentPageSize, type } = reqQuery;
    const limit = currentPageSize; // 返回数据量
    const offset = (currentPage - 1) * currentPageSize; // 数据偏移量
    const queryData = {};
    if (type != null) queryData.type = type;
    const products = await app.mysql.select('storage', { limit, offset, where: queryData });
    // 处理显示时间
    products.forEach(pro => {
      pro.inTime = moment(pro.inTime).format('YYYY-MM-DD HH:mm:ss');
    });
    // 返回
    if (!products) {
      return { code: 1, desc: '查询失败' };
    }
    return { code: 0, desc: '查询成功', options: products };
  }

  /**
   * 添加商品
  */
  async addProduct(reqBody) {
    const { app } = this;
    // 验证code是否存在
    const isExit = await app.mysql.get('storage', { code: reqBody.code });
    if (isExit) {
      return { code: 1, desc: '商品码重复' };
    }
    // 格式化时间戳
    reqBody.inTime = moment(reqBody.inTime).format('YYYY-MM-DD HH:mm:ss');
    // sql
    const result = await app.mysql.insert('storage', reqBody);
    // res
    if (result.affectedRows !== 1) {
      return { code: 1, desc: '添加失败' };
    }
    return { code: 0, desc: '添加成功' };
  }

  /**
   * 删除商品
  */
  async delProduct(reqBody) {
    const { app } = this;
    for (const code of reqBody) {
      const result = await app.mysql.delete('storage', { code });
      if (result.affectedRows !== 1) { // 判断依据错误
        return { code: 1, desc: '删除失败' };
      }
    }
    return { code: 0, desc: '删除成功' };
  }

  /**
   * 修改商品信息
  */
  async editProduct(reqBody) {
    const { app } = this;
    // 格式化时间戳
    reqBody.inTime = moment(reqBody.inTime).format('YYYY-MM-DD HH:mm:ss');
    // sql
    const result = await app.mysql.update('storage', reqBody);
    // res
    if (result.affectedRows !== 1) {
      return { code: 1, desc: '修改失败' };
    }
    return { code: 0, desc: '修改成功' };
  }
}

module.exports = storageService;
