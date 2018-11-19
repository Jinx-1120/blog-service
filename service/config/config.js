const config = {
  uri: process.env.NODE_ENV === 'production' ? 'mongodb://0.0.0.0:27017/blog' : 'mongodb://blog_admin:blog_admin@127.0.0.1:27017/my_blog',
  port:'3000',
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  uploadPath: process.cwd() + '/public/uploads',
  baseImgUrl: process.env.NODE_ENV === 'production' ? '' :`http://${getIPAdress()}:3000`
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
