'use strict';
// 获取 Token
exports.getAccessToken = ctx => {
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};

exports.pagingParam = params => {
  const paging_param = {
    currentPage: params.currentPage ? params.currentPage : 1,
    pageSize: params.pageSize ? params.pageSize : 10,
  };

  return paging_param;
};

// 处理成功响应
exports.success = (ctx, result = null, messages = '请求成功', status = 201) => {
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
