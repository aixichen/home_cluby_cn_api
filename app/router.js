'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.create);
  router.get('/user/current', app.jwt, controller.user.show);
  router.resources('user', '/user', app.jwt, controller.user);

  router.resources('account', '/account', app.jwt, controller.account);
};
