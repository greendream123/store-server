'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 鉴权 token
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
