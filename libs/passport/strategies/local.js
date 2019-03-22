const path = require('path');
const LocalStrategy = require('passport-local');
const User = require(path.join(process.cwd(), 'models', 'user'));


function LoginError(status, body) {
  this.status = status;
  this.body = body;
}


module.exports = new LocalStrategy(
  {
    // session: false,
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({email});

      if (!user) return done(new LoginError(400, 'No sir, try else'), false, null);

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) return done(new LoginError(400, 'Password not corrent'), false, null);

      return done(null, user.toJSON(), {message: 'Добро пожаловать.'})
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
);
