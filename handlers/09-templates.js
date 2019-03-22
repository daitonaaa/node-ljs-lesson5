const pug = require('pug');
const path = require('path');


exports.init = (app) => app.use(async (ctx, next) => {
  ctx.locals = {
    get user() {
      return ctx.state.user;
    },

    get flash() {
      return ctx.getFlashMessages();
    },
  };

  ctx.render = function (templatePath, locals) {
    return pug.renderFile(
      path.join(process.cwd(), 'templates', templatePath),
      Object.assign({}, ctx.locals, locals)
    );
  };

  await next();
});
