const User = require('../models/user');
const {isNotEmpty, Response} = require('../utils');


function ResponseError(err) {
  const errors = {};

  Object.keys(err.errors).forEach((key) => {
    errors[key] = err.errors[key].message;
  });

  this.errors = errors;
};


const userController = {

  getMe(ctx) {
    const isAuthenticated = ctx.isAuthenticated();

    return new Promise((resolve) => {
      if (isAuthenticated) resolve(new Response(200, ctx.state.user.toJSON()))
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

  create(ctx) {
    const incData = ctx.request.body;

    return new Promise(async (resolve) => {
      if (!isNotEmpty(incData)) resolve(new Response(400, 'Bad request'));

      // Generate password
      const user = new User();
      const data = await user.setPassword(incData.password);

      User.create({ ...incData, ...data })
        .then((results) => {
          resolve(new Response(200, results));
        })
        .catch((err) => {
          if (err.name !== 'ValidationError') throw err;

          resolve(new Response(400, new ResponseError(err)));
        });
    });
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
  }

};

module.exports = userController;
