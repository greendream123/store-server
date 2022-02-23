'use strict';
// sale路由
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { sale } = controller;
  router.get('/saleInfos', sale.saleInfos);
  router.get('/yearSale', sale.yearSale);
  router.get('/years', sale.years);
  router.get('/saleLogCount', sale.saleLogCount);
  router.get('/saleLogs', sale.saleLogs);
};
