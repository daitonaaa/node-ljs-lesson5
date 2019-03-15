const Router = require('koa-router');
const router = new Router();

const User = require('./controller/user');


router.get('/users', async (ctx) => {
  const data = await User.getList();
  console.log(data);
  ctx.body = 'users list'
});

module.exports = router;
