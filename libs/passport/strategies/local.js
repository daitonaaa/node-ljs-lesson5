const path = require('path');
const LocalStrategy = require('passport-local');
const User = require(path.join(process.cwd(), 'models', 'user'));


function LoginError(status, body) {
  this.body = body;
  this.status = status;
}


module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({email});

      if (!user || !user.salt) return done(new LoginError(400, 'No sir, try else'), false, null);

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) return done(new LoginError(400, 'Password not corrent'), false, null);

      return done(null, user.toJSON(), {message: 'Добро пожаловать.'})
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
);
