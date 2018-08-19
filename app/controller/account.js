'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async index() {
    try {
      const ctx = this.ctx;
      const account_type = ctx.query.account_type;
      if (!account_type) {
        throw new Error('account_type参数错误');
      }
      const query = {};
      query.account_type = account_type;
      const user_id = ctx.state.user.id;
      const { currentPage, pageSize } = ctx.helper.pagingParam(ctx.query);
      const result = await ctx.service.account.index(user_id, query, currentPage, pageSize);
      this.ctx.helper.success(ctx, result);
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }
  }
}
module.exports = AccountController;
