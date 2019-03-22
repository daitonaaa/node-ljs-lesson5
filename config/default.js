const path = require('path');

module.exports = {
  port: 8081,
  root: process.cwd(),
  mongodb: {
    debug: true,
    uri: 'mongodb://node:node@localhost:27017/users_app',
  },
  crypto: {
    hash: {
      length: 128,
      iterations: 10,
    },
  },
};
