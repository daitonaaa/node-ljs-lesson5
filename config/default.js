const path = require('path');

module.exports = {
  port: 8081,
  root: process.cwd(),
  paths: {
    public: path.join(process.cwd(), 'public'),
  },
};
