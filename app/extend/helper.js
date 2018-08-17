'use strict';
// 获取 Token
exports.getAccessToken = ctx => {
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};

// 校验 Token
exports.verifyToken = async (ctx, userId) => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.user.verifyToken(token);
  if (!verifyResult.verify) {
    ctx.helper.error(ctx, 401, verifyResult.message);
    return false;
  }
  if (userId !== verifyResult.message.id) {
    ctx.helper.error(ctx, 401, '用户 ID 与 Token 不一致');
    return false;
  }
  return true;
};

// 处理成功响应
exports.success = (ctx, result = null, messages = '请求成功', status = 200) => {
  ctx.body = {
    code: 0,
    message: messages,
    data: result,
  };
  ctx.status = status;
};

// 处理失败响应
exports.error = (ctx, codes, messages) => {
  ctx.body = {
    code: codes,
    message: messages,
  };
  ctx.status = codes;
};
