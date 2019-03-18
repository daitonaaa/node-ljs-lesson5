const path = require('path');

module.exports = {
  port: 8081,
  root: process.cwd(),
  mongodb: {
    uri: 'mongodb://node:node@localhost:27017/users_app',
  },
};
