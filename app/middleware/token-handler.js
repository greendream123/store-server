'use strict';
module.exports = options => {
  return async function(ctx, next) {
    // const token = ctx.cookies.get('token');
    const token = ctx.request.header.authorization;
    let decode = '';
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);// 验证token
        console.log('decode======>', decode);
        // 获取用户信息
        ctx.decode = decode;
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          code: 2,
          desc: 'token expire',
        };
        return;
      }
      // 切记先解析token并存储数据后再执行回调，否则解析数据获取不到x
      await next();
    } else {
      console.log(token);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: 'no token',
      };
      return;
    }
  };
};
