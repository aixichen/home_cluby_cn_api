'use strict';

const Controller = require('egg').Controller;

class AnalysisController extends Controller {
  async chartByAmountType() {
    try {
      const ctx = this.ctx;
      const account_type = ctx.query.account_type;
      if (!account_type) {
        throw new Error('account_type参数错误');
      }
      const { start_time, end_time } = ctx.query;
      const query = {};
      query.account_type = account_type;
      if (start_time && end_time) {
        query.start_time = start_time;
        query.end_time = end_time;
      }
      const user_id = ctx.state.user.id;
      const result = await ctx.service.analysis.chartByAmountType(user_id, query);
      const temp_result = result.map(item => {
        return {
          x: item.amount_type_cn,
          y: ctx.helper.stringToInt(item.amount_sum),
        };
      });
      ctx.body = temp_result;
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }
  }
}
module.exports = AnalysisController;
