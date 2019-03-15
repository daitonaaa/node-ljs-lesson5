const path = require('path');

module.exports = {
  port: 8081,
  root: process.cwd(),
  mongodb: {
    uri: 'mongodb://localhost/users_app'
  },
};
