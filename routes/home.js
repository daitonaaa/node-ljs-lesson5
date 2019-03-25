module.exports = [
  {
    url: '/',
    method: 'get',
    controller: (ctx, next) => new Promise((resolve) => {
        const isAuthorize = ctx.isAuthenticated();

        if (isAuthorize) {
          resolve({body: ctx.render('home.pug'), status: 200});
        } else {
          resolve({body: ctx.render('login.pug'), status: 200});
        }

      })
    },
  {
    method: 'get',
    url: '/registration',
    controller: (ctx, next) => new Promise((resolve) => {
      resolve({body: ctx.render('registration.pug'), status: 200});
    }),
  }
];
