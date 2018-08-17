'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534411929422_4439';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    database: 'test',
    host: '123.206.103.199',
    port: '3306',
    username: 'root',
    password: '123456',
  };

  config.jwt = {
    enable: false,
    secret: 'xxxxxxxxxxxxx',
  };

  return config;
};
