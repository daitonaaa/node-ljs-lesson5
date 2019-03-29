const app = require('./app');
const colors = require('colors');
const config = require('config');
const socket = require('./libs/socket');

const port = config.get('port');

const server = app.listen(port, () => {
  console.log(colors.green(`App is running on port ${port}`));
});

socket(server);
