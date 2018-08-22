'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534411929422_4439';

  config.sequelize = {
    dialect: 'mysql',
    database: 'home',
    host: 'mysqldb',
    port: '3306',
    username: 'root',
    password: '123456',
    timezone: '+08:00',
  };
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  config.jwt = {
    enable: true,
    secret: 'xxxxxxxxxxxxx',
    match: '/jwt',
  };

  return config;
};
