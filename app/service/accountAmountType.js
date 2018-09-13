'use strict';
const Service = require('egg').Service;

class AccountAmountTypeService extends Service {
  async index(user_id, query, currentPage, pageSize) {
    const build = {};
    build.uid = user_id;
    build.account_type = query.account_type;
    if (query.amount_type_name) {
      build.amount_type_name = query.amount_type_name;
    }

    if (query.remark) {
      build.remark = {
        $like: '%' + query.remark + '%',
      };
    }

    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    const result = {};
    result.list = await this.ctx.model.AccountAmountType.findAll({
      where: build,
      offset,
      limit,
      order: [[ 'updated_at', 'desc' ]],
    });
    const tempTotal = await this.ctx.model.AccountAmountType.count({ where: build });

    result.pagination = {};
    result.pagination.pageSize = pageSize;
    result.pagination.currentPage = currentPage;
    result.pagination.total = tempTotal;
    return result;
  }

  async create(user_id, data) {
    data.uid = user_id;
    return await this.ctx.model.AccountAmountType.create(data);
  }

  async update(user_id, data) {
    data.uid = user_id;
    const accountAmountType = await this.ctx.model.AccountAmountType.findById(data.id);
    return await accountAmountType.update(data);
  }
}

module.exports = AccountAmountTypeService;
