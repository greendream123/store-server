'use strict';
// user路由
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user } = controller;
  router.post('/login', user.login);
  router.get('/accounts', user.accounts);
  router.post('/addAccount', user.addAccount);
  router.post('/editAccount', user.editAccount);
  router.post('/delAccount', user.delAccount);
};
