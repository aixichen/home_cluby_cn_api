'use strict';
const Service = require('egg').Service;

class AnalysisService extends Service {
  async chartByAmountType(user_id, query) {
    const build = {};
    build.uid = user_id;
    build.account_type = query.account_type;

    if (query.start_time && query.end_time) {
      const start_time = query.start_time + ' 00:00:00';
      const end_time = query.end_time + ' 23:59:59';
      build.amount_date = {
        $between: [ start_time, end_time ],
      };
    }

    

    const build_amount_type = {};
    build_amount_type.uid = user_id;
    build_amount_type.account_type = query.account_type;
    const amount_type = await this.ctx.model.AccountAmountType.findAll({
      where: build_amount_type,
    }).then(result => {
      const temp_result = [];
      result.forEach(result_value => {
        temp_result[result_value.id] = result_value.amount_type_name;
      });
      return temp_result;
    });
    const result = await this.ctx.model.Account.findAll({
      attributes: [ 'amount_type', [ this.app.Sequelize.fn('SUM', this.app.Sequelize.col('amount')), 'amount_sum' ]],
      where: build,
      group: 'amount_type',
      order: [[ 'amount_type', 'desc' ]],
      raw: true,
    }).then( temp_result => {
      return temp_result.map(item =>{
        const temp_amount_type_cn=amount_type[item.amount_type]?amount_type[item.amount_type]:'';
         return {
           ...item,
           amount_type_cn:temp_amount_type_cn
         };
      });
    });
    return result;
  }

  async create(user_id, data) {
    data.uid = user_id;
    return await this.ctx.model.Account.create(data);
  }
}

module.exports = AnalysisService;
