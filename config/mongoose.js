const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
const options = {
  useNewUrlParser: true,
  server: {
    auto_reconnect: true,
    poolSize: 10,
    // useMongoClient: true,
    useUnifiedTopology: true
  }
};
exports.connect = () => {
  console.log('========')

  console.log(`Connecting to mongo @: ${config.uri}`);
  mongoose.connect(config.uri, options);
  return mongoose.connection;
};

exports.disconnect = () => {
  mongoose.disconnect(() => {
    console.log('========')
    console.log(`disconnect : ${config.uri}`);
  });
}
