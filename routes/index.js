const auth = require('./auth');
const home = require('./home');
const users = require('./users');


const routes = [].concat(
  auth,
  home,
  users,
);

module.exports = routes;
