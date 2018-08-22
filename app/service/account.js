'use strict';
const Service = require('egg').Service;

class AccountService extends Service {
  async index(user_id, query, currentPage, pageSize) {
    const build={};
    build.uid=user_id;
    build.account_type=query.account_type
    if(query.amount_type){
      build.amount_type=query.amount_type;
    }
    
    if(query.remark){
      build.remark = {
        $like: '%'+query.remark+'%',
      }
    }

    if(query.date){
      const start_time = query.date+' 00:00:00';
      const end_time = query.date+' 23:59:59';
      build.updated_at = {
        $between: [ start_time, end_time ],
      }
    }
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    const result = {};

    const build_amount_type = {};
    build_amount_type.uid=user_id;
    build_amount_type.account_type=query.account_type;
    const amount_type = await this.ctx.model.AccountAmountType.findAll({
      where: build_amount_type,
    }).then(result => {
      const temp_result = [];
      result.forEach(result_value => {
        temp_result[result_value.id] = result_value.amount_type_name;
      });
      return temp_result;
    });
    result.list = await this.ctx.model.Account.findAll({
      where: build,
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

   
    const tempTotal = await this.ctx.model.Account.count({ where: build });
    
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
