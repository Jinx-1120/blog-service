const mongo_config = {
  uri: 'mongodb://blog_admin:blog_admin@127.0.0.1:27017/my_blog',
  port:'3000',
  logs: process.env.NODE_ENV === 'prd' ? 'combined' : 'dev'
};

module.exports = mongo_config;