const Koa = require('koa');
const app = new Koa();

const router = require('./router');

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-errors').init(app);
require('./handlers/05-session').init(app);
require('./handlers/06-bodyParser').init(app);

app.use(router.routes());


module.exports = app;
