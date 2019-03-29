const session = require('koa-session');
const mongoose = require('../libs/mongoose');
const sessionStore = require('../libs/sessionStore');

exports.init = (app) => app.use(session({
  signed: false,
  store: sessionStore,
}, app));
