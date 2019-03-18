const Router = require('koa-router');
const router = new Router();

const User = require('./controller/user');


const userRoutes = [
  {method: 'get', url: '/users', controller: 'getList'},
  {method: 'get', url: '/users/:id', controller: 'getById'},
  {method: 'post', url: '/users', controller: 'create'},
  {method: 'patch', url: '/users/:id', controller: 'update'},
  {method: 'delete', url: '/users/:id', controller: 'delete'},
];

userRoutes.forEach(({ method, url, controller }) => {
  return router[method](url, async (ctx) => {
    const {body, status} = await User[controller](ctx);

    ctx.body = body;
    ctx.status = status;
  });
});


module.exports = router;
