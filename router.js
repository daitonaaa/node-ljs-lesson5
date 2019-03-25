const Router = require('koa-router');
const router = new Router();


const routes = require('./routes');


routes.forEach(({ method, url, controller, noAcync }) => {
  if (noAcync) return router[method](url, controller);

  else return router[method](url, async (ctx, next) => {
    const {body, status, redirect} = await controller(ctx, next);

    if (redirect) ctx.redirect(redirect);
    else {
      ctx.body = body;
      ctx.status = status;
    }
  });
});


module.exports = router;
