const path = require('path');
const config = require('config');
const {Response, ResponseError} = require('../utils');
const passport = require('../libs/passport');
const User = require(path.join(process.cwd(), 'controller', 'user'));
const SendEmail = require(path.join(process.cwd(), 'controller', 'sendEmail'));


const authController = {

  login(ctx, next) {

    return new Promise((resolve) => {
      passport.authenticate('local', async (err, user, info) => {

        if (err) {
          const {status, body} = err;

          resolve(new Response(status, body));
          return;
        }

        if (!user.verify) {
          resolve(new Response(400, 'User is not verified'));
          return;
        }

        await ctx.login(user);
        resolve(new Response(200, {user}));
      })(ctx, next)
    })
  },

  logout(ctx, next) {
    return new Promise(async (resolve) => {
      await ctx.logout();

      resolve(new Response(200, 'ok'));
    })
  },

  registration(ctx, next) {
    return new Promise(async (resolve) => {
      const user = await User.generateNewUser(ctx.request.body);
      const registerUser = await User.create(user);

      if (registerUser.status !== 200) {
        resolve(new Response(registerUser.status, registerUser.body));
        return;
      }

      const transportEmail = await SendEmail.verifyUser(registerUser.body);

      if (transportEmail.accepted.includes(registerUser.body.email)) {
        resolve(new Response(200, 'ok'));
      } else {
        resolve(new ResponseError({sendMail: 'Mail service not avaliable'}));
      }
    });
  },

  vkontakteLogin: (ctx, next) => passport.authenticate('vkontakte',
    config.get('providers.vkontakte.options'))
  (ctx, next),

  vkontakteAuth(ctx, next) {
    return new Promise((resolve) => {
      passport.authenticate('vkontakte', async (err, user, info) => {

        if (err) throw err;

        await ctx.login(user);
        resolve({ redirect: '/' });
      })(ctx, next)
    })
  },

};


module.exports = authController;
