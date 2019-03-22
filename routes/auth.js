const path = require('path');
const Auth = require(path.join(process.cwd(), 'controller', 'auth'));

const routes = [
  {
    url: '/login',
    method: 'post',
    controller: Auth.login,
  },
  {
    url: '/logout',
    method: 'post',
    controller: Auth.logout,
  },
];

module.exports = routes;
