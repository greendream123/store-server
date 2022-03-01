'use strict';
// storage路由
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { storage } = controller;
  router.get('/productCount', storage.productCount);
  router.get('/products', storage.products);
  router.post('/addProduct', storage.addProduct);
  router.post('/delProduct', storage.delProduct);
  router.post('/editProduct', storage.editProduct);
  router.post('/uploadPicture', storage.uploadPicture);
};
