const passport = require('../libs/passport');
const {Response} = require('../utils');


const authController = {

  login(ctx, next) {

    return new Promise((resolve) => {
      passport.authenticate('local', async (err, user, info) => {

        if (err) {
          const {status, body} = err;

          resolve(new Response(status, body));
        } else {
          await ctx.login(user);

          resolve(new Response(200, { user }));
        }

      })(ctx, next)
    })
  },

  logout(ctx, next) {
    return new Promise(async (resolve) => {
      await ctx.logout();

      ctx.redirect('/');

      resolve(new Response(200, 'ok'));
    })
  }
};


module.exports = authController;
