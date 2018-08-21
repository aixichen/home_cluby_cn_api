'use strict';
const Service = require('egg').Service;

class AccountService extends Service {
  async index(user_id, query, currentPage, pageSize) {
    query.uid = user_id;
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    const result = {};

    const result_list = await this.ctx.model.Account.findAll({
      where: query,
      offset,
      limit,
      order: [[ 'amount_date', 'desc' ], [ 'updated_at', 'desc' ]],
    });

    result_list.forEach(item => {
      item.amount_type_cn = '1';
    });
    const tempTotal = await this.ctx.model.Account.count({ where: query });
    result.list = result_list;
    result.test = '3';
    result.pagination = {};
    result.pagination.pageSize = pageSize;
    result.pagination.currentPage = currentPage;
    result.pagination.total = tempTotal;
    return result;
  }
}

module.exports = AccountService;
