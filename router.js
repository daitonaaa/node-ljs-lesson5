const Router = require('koa-router');
const router = new Router();


const routes = require('./routes');


routes.forEach(({ method, url, controller }) => {
  return router[method](url, async (ctx, next) => {
    const {body, status} = await controller(ctx, next);

    ctx.body = body;
    ctx.status = status;
  });
});


module.exports = router;
