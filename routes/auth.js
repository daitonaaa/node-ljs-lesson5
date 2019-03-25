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
  {
    method: 'post',
    url: '/registration',
    controller: Auth.registration,
  },
  {
    method: 'get',
    noAcync: true,
    url: '/login/vkontakte',
    controller: Auth.vkontakteLogin,
  },
  {
    method: 'get',
    url: '/auth/vkontakte',
    controller: Auth.vkontakteAuth,
  },
];

module.exports = routes;
