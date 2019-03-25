const User = require('../models/user');
const {isNotEmpty, Response, ResponseError} = require('../utils');


const userController = {

  getMe(ctx) {
    const isAuthenticated = ctx.isAuthenticated();

    return new Promise((resolve) => {
      if (isAuthenticated) resolve(new Response(200, ctx.state.user.toJSON()));
      else resolve(new Response(400, 'Not authorize'))
    })
  },

  getList() {
    return new Promise((resolve) => {
      User.find()
        .then((results) => {
          resolve(new Response(200, results));
        })
        .catch((err) => {
          throw err;
        });
    });
  },

  getByEmail(email) {
    return User.findOne({ email });
  },

  getById(ctx) {
    const userId = ctx.params.id;

    return new Promise((resolve) => {

      User.find({_id: userId})
        .then((results) => {
          if (isNotEmpty(results)) resolve(new Response(200, results));
          else resolve(new Response(404, 'User not found'));
        });
    });
  },

  async generateNewUser(user) {
    if (!user.email || !user.password || !user.displayName) {
      return false;
    }

    // Generate password
    const model = new User();
    const passwordData = await model.setPassword(user.password);

    return {
      ...user,
      ...passwordData,
      verifyCode: await model.generateVerifyCodes(),
    };
  },

  create(user) {
    return new Promise(async (resolve) => {
      if (!isNotEmpty(user)) resolve(new Response(400, 'Bad request'));

      User.create(user)
        .then((results) => {
          resolve(new Response(200, results));
        })
        .catch((err) => {
          if (err.name !== 'ValidationError') throw err;

          resolve(new Response(400, new ResponseError(err)));
        });
    });
  },

  verify(ctx) {
    const { code } = ctx.params;

    return new Promise(async (resolve) => {
      User.findOne({ verifyCode: code }, async (err, doc) => {

        if (err) {
          resolve(new Response(404, err));
          return;
        }

        if (doc.verify) {
          resolve(new Response(400, 'User already verified'));
          return;
        }

        doc.verify = true;
        await doc.save();
        ctx.login(doc);

        resolve({ redirect: '/' });
      });
    })
  },

  update(ctx) {
    const userId = ctx.params.id;
    const newUserData = ctx.request.body;

    return new Promise((resolve) => {

      User.findOne({_id: userId}, (err, doc) => {
        const {email, displayName} = newUserData;

        if (err) {
          resolve(new Response(404, 'User not found'));
          return;
        }

        if (email) doc.email = email;
        if (displayName) doc.displayName = displayName;

        doc.save((err) => {
          resolve(new Response(400, new ResponseError(err)));
          return;
        });

        resolve(new Response(200, new Response(doc)));
      })
    })
  },

  delete(ctx) {
    const userId = ctx.params.id;

    return new Promise((resolve) => {

      User.deleteOne({_id: userId}, (err, doc) => {

        if (err || !doc.deletedCount) {
          resolve(new Response(404, 'User not found'));
          return;
        }

        resolve(new Response(200, 'ok'));
      })
    })
  },

};

module.exports = userController;
