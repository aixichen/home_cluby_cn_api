// test/factories.js
'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 和默认数据
  factory.define('user', app.model.User, {
    name: factory.sequence('User.name', n => `name_${n}`),
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    email: factory.seq('User.email', n => `name_${n}@qq.com`),
    mobile: '18716377335',
    password: '123456',
    prefix: 86,
  });
};
