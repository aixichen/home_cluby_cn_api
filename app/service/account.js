'use strict';
const Service = require('egg').Service;

class AccountService extends Service {
  async index(user_id, query, currentPage, pageSize) {
    query.uid = user_id;
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    const result = {};
    const amount_type = await this.ctx.model.AccountAmountType.findAll({
      where: query,
    }).then(result => {
      const temp_result = [];
      result.forEach(result_value => {
        temp_result[result_value.id] = result_value.amount_type_name;
      });
      return temp_result;
    });
    result.list = await this.ctx.model.Account.findAll({
      where: query,
      offset,
      limit,
      order: [[ 'amount_date', 'desc' ], [ 'updated_at', 'desc' ]],
    }).then(result => {
     return result.map(item =>{
       const temp_amount_type_cn=amount_type[item.amount_type];
        return {
          ...item.toJSON(),
          amount_type_cn:temp_amount_type_cn
        };
     });
    });

   
    const tempTotal = await this.ctx.model.Account.count({ where: query });
    
    result.pagination = {};
    result.pagination.pageSize = pageSize;
    result.pagination.currentPage = currentPage;
    result.pagination.total = tempTotal;
    return result;
  }

  async create(user_id, data){
    data.uid=user_id;
    return await this.ctx.model.Account.create(data);
  }
}

module.exports = AccountService;
