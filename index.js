const app = require('./app');
const colors = require('colors');
const config = require('config');

const port = config.get('port');

app.listen(port, () => {
  console.log(colors.green(
    `App is running on port ${port}`
  ));
});
