'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL, DATEONLY } = app.Sequelize;

  const Account = app.model.define('account', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    amount_title: {
      type: STRING(50),
      validate: {
        len: [ 1, 50 ],
      },
    },
    amount: {
      type: DECIMAL(11, 2),
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
    amount_type: {
      type: INTEGER(1),
      validate: {
        isInt: true,
        min: 1,
      },
    },
    account_type: {
      type: INTEGER(1),
      validate: {
        isInt: true,
        min: 1,
      },
    },
    amount_date: {
      type: DATEONLY,
      validate: {
        isDate: true,
      },
    },
    remark: {
      type: STRING,
    },
  }, {
    freezeTableName: true,
  });
  return Account;
};
