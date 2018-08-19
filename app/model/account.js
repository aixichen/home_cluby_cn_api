'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, DECIMAL, DATEONLY } = app.Sequelize;

  const Account = app.model.define('account', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: INTEGER,
    amount_title: STRING(50),
    amount: DECIMAL(11, 2),
    amount_type: INTEGER(1),
    account_type: INTEGER(1),
    amount_date: DATEONLY,
    remark: STRING,
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
  });

  return Account;
};
