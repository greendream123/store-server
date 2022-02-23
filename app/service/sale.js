'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class SaleService extends Service {
  // async gather(reqBody) {
  //   const { app, ctx } = this;
  // }

  // 查询销售额
  async saleInfos(reqQuery) {
    const { app } = this;
    const { year, month } = reqQuery;
    const currentTime = new Date();
    const selectYear = year ? year : currentTime.getFullYear();
    const selectMonth = month ? month : '';
    let condition = selectYear;
    if (selectMonth) condition += '-' + selectMonth;
    const sql = `select * from sale where s_time like "%${condition}%" ORDER BY s_time asc`;
    const saleInfos = await app.mysql.query(sql);
    if (!saleInfos) {
      return { code: 1, desc: '查询失败' };
    }
    const productTypes = [];
    saleInfos.forEach(item => {
      if (productTypes.indexOf(item.type) === -1) productTypes.push(item.type);
    });
    const returnData = {};
    productTypes.forEach(_type => {
      returnData[_type] = [];
      saleInfos.forEach(item => {
        item.s_time = moment(item.s_time).format('YYYY-MM');
        if (item.type === _type) returnData[_type].push(item);
      });
    });
    return { code: 0, desc: '查询成功', options: returnData };
  }

  // 查询销售年比 / 销售日志
  async yearSale(reqQuery) {
    const { app } = this;
    const { currentPage, currentPageSize, selectYear } = reqQuery;
    let saleInfos = null;
    if (!selectYear) {
      const limit = currentPageSize; // 返回数据量
      const offset = (currentPage - 1) * currentPageSize; // 数据偏移量
      const sql = `select * from orderform ORDER BY s_time desc LIMIT ${offset}, ${limit}`;
      saleInfos = await app.mysql.query(sql);
      if (!saleInfos) {
        return { code: 1, desc: '查询失败' };
      }
    } else {
      const sql = `select * from orderform where s_time like "%${selectYear}%" ORDER BY s_time asc`;
      saleInfos = await app.mysql.query(sql);
      if (!saleInfos) {
        return { code: 1, desc: '查询失败' };
      }
      saleInfos.forEach(item => {
        item.s_time = moment(item.s_time).format('M');
      });
    }

    return { code: 0, desc: '查询成功', options: saleInfos };
  }

  // 获取有销售记录的年份
  async years() {
    const { app } = this;
    const sql = 'select s_time from orderform ORDER BY s_time asc';
    const years = await app.mysql.query(sql);
    if (!years) {
      return { code: 1, desc: '查询失败' };
    }
    const returnData = [];
    years.forEach(_year => {
      const pushData = moment(_year.s_time).format('YYYY');
      if (returnData.indexOf(pushData) === -1) {
        returnData.push(pushData);
      }
    });
    return { code: 0, desc: '查询成功', options: returnData };
  }

  // 查询销售日志数量
  async saleLogCount() {
    const { app } = this;
    const saleLogs = await app.mysql.select('orderform');
    if (!saleLogs) return { code: 1, desc: '查询失败' };
    return { code: 0, desc: '查询成功', options: saleLogs.length };
  }

  // 查询销售日志
  async saleLogs(reqQuery) {
    const { app } = this;
    const { currentPage, currentPageSize } = reqQuery;
    const limit = currentPageSize; // 返回数据量
    const offset = (currentPage - 1) * currentPageSize; // 数据偏移量
    const saleLogs = await app.mysql.select('orderform', { limit, offset });
    // 处理显示时间
    saleLogs.forEach(item => {
      item.s_time = moment(item.s_time).format('YYYY-MM-DD HH:mm:ss');
    });
    // 返回
    if (!saleLogs) return { code: 1, desc: '查询失败' };
    return { code: 0, desc: '查询成功', options: saleLogs };
  }
}

module.exports = SaleService;
