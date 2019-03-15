const Router = require('koa-router');
const router = new Router();

router.get('/users', (ctx) => {
  ctx.body = 'users list'
});

module.exports = router;
