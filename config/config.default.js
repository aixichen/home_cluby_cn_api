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
    username: 'home',
    password: 'home123456',
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
  config.alinode = {
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '75555',
    secret: '3a36c1916de5e5df7bd921a89183d1a49e6ab996',
    logdir: '/api/',
    agentidMode: 'IP',
  };

  return config;
};
