/*
 * @Author: jinhaidi
 * @Date: 2019-07-31 14:00:41
 * @Description: file content
 * @LastEditTime: 2020-01-25 18:49:01
 */
const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});
const config = {
  uri: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI1 : process.env.MONGO_URI2,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? process.env.MORGAN_LOG1 : process.env.MORGAN_LOG2,
  uploadPath: process.cwd() + '/public/uploads',
  baseImgUrl: process.env.NODE_ENV === 'production' ? '' :`http://${getIPAdress()}:3000`,
  qiniuConfig: {
    accessKey: process.env.QINIUACCESSKEY,
    secretKey: process.env.QINIUSECRETKEY,
    bucket: process.env.QINIUBUCKET,
    origin: process.env.QINIUORIGIN
  },
  MD5_SUFFIXSTR: process.env.MD5_SUFFIXSTR,
  baidu: {
    site: process.env.SITE,
    token: process.env.BAIDUTOKEN
  },
  emial: {
    account: process.env.EMAIL_ACCOUNT,
    pwd: process.env.EMAIL_PWD
  }
};
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

module.exports = config;
