const config = {
  uri: 'mongodb://blog_admin:blog_admin@127.0.0.1:27017/my_blog',
  port:'3000',
  logs: process.env.NODE_ENV === 'prd' ? 'combined' : 'dev',
  uploadPath: process.cwd() + '/public/uploads',
  baseImgUrl: process.env.NODE_ENV === 'prd' ? '45.32.103.162:8393' : 'http://127.0.0.1:3000'
};

module.exports = config;
