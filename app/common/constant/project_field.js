'use strict';

// const env = process.env.NODE_ENV;
// const upload_path = env === 'development' ? 'D:/nginx/nginxServer/static' : '/root/nginx/upload';
const upload_path = 'app/public/images/';

exports.PROJECT_FIELD = {
  PATH: {
    UPLOAD_PATH: upload_path,
  },
};
