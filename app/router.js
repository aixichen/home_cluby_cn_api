'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/home', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/register', controller.user.create);
  router.get('/api/user/current', app.jwt, controller.user.show);
  router.resources('user', '/api/user', app.jwt, controller.user);

  router.resources('account', '/api/account', app.jwt, controller.account);
};
