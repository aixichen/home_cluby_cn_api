'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    avatar: STRING,
    email: STRING(50),
    mobile: STRING(11),
    password: STRING(36),
    prefix: STRING(10),
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
  });

  return User;
};
