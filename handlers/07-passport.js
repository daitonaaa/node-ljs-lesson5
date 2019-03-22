const passport = require('koa-passport');


exports.init = (app) => {
  // ctx.login(user), ctx.logout, ctx.isAuthenticated
  app.use(passport.initialize());
  app.use(passport.session()); // ctx.state.user = user;
};
