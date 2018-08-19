'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AccountAmountType = app.model.define('account_amount_type', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: INTEGER,
    amount_type_name: STRING(50),
    account_type: INTEGER(1),
    remark: STRING,
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
  });

  return AccountAmountType;
};
