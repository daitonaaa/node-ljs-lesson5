const session = require('koa-session');
const mongoose = require('../libs/mongoose');
const mongooseStore = require('koa-session-mongoose');

exports.init = (app) => app.use(session({
  signed: false,

  store: mongooseStore.create({
    name: 'Session',
    expires: 3600 * 4,
    connection: mongoose
  })
}, app));
