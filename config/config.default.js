/* eslint-disable no-else-return */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // config.default.js
  config.middleware = [ 'tokenHandler' ];
  // 中间件执行匹配开启
  config.tokenHandler = {
    // enable: false,
    // match(ctx) { // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
    //   // 匹配不需要验证token的路由
    //   const url = ctx.request.url;
    //   if (url.startsWith('/')) {
    //     ctx.logger.info('config.tokenHandler:', '开启token验证');
    //     return true; // 开启中间件，开启token验证
    //   } else {
    //     ctx.logger.info('config.tokenHandler:', '关闭token验证');
    //     return false;
    //   }
    // },
    ignore: '/login',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_lwj_394216408';
  // mysql
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: 'lwj_store',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // cors
  config.cors = {
    // origin: 'http://localhost:8080', // vue axios发送请求携带cookie时，此处不允许为通配符 *
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
    credentials: true, // 允许客户端发送cookie
  };
  // 解除安全验证，保证post请求对接口可以正常访问
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  // log
  config.logger = {
    dir: '/z/server/logs/sale',
    outputJSON: true,
  };
  // jwt 私钥
  config.jwt = {
    secret: 'liwenjie',
  };
  // add your user config here
  const userConfig = {
    myAppName: 'egg_store',
  };

  return {
    ...config,
    ...userConfig,
  };
};
