'use strict';
const Service = require('egg').Service;

class AccountService extends Service {
  async index(user_id, query, currentPage, pageSize) {
    query.uid = user_id;
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    const result = await this.ctx.model.Account.findAndCountAll({
      offset,
      limit,
      order: [[ 'amount_date', 'desc' ], [ 'updated_at', 'desc' ]],
    }).then(function(temp_result) {
      temp_result.pageSize = pageSize;
      temp_result.currentPage = currentPage;
      return temp_result;
    });
    return result;
  }
}

module.exports = AccountService;
