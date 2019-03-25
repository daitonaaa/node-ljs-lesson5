const path = require('path');
const passport = require('koa-passport');
const User = require(path.join(process.cwd(), 'models', 'user'));


const localStrategy = require('./strategies/local');
const VKontakteStrategy  = require('./strategies/vkontakte');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

passport.use(localStrategy);
passport.use(VKontakteStrategy);

module.exports = passport;
