module.exports = {
  port: 8081,
  root: process.cwd(),
  mongodb: {
    debug: true,
    uri: 'mongodb://node:node@localhost:27017/users_app',
  },
  providers: {
    vkontakte: {
      clientId: 6913666,
      secretKey: 'oSDTiEcTVtzR91nzMY3g',
      options: {
        scope: ['email', 'friends'],
      },
    },
  },
  crypto: {
    hash: {
      length: 128,
      iterations: 10,
    },
  },
  mailer: {
    gmail: {
      user: 'oasocz',
      password: 'fd5bcol2',
    },
  },
};
