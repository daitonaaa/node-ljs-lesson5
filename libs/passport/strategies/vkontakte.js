const config = require('config');
const path = require('path');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const User = require(path.join(process.cwd(), 'controller', 'user'));

module.exports = new VKontakteStrategy(
  {
    clientID: config.get('providers.vkontakte.clientId'),
    clientSecret: config.get('providers.vkontakte.secretKey'),
    callbackURL: 'http://localhost:8081/auth/vkontakte',
  },
  async (accessToken, refreshToken, params, profile, done) => {
    if (!params.email) {
      return done(null, false, {message: 'No email'});
    }

    const email = params.email;

    try {
      let user = await User.getByEmail(email);

      if (user) return done(null, user.toJSON(), {message: 'Welcome'});

      else {
        user = await User.create({
          email,
          displayName: profile.displayName,
        });
      }

      done(null, user.toJSON(), {message: 'Welcome'});
    } catch (e) {
      console.error(err);
      done(err);
    }
  }
);
