'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  describe('GET /user', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 user 对象到数据库中
      await app.factory.createMany('user', 3);
      const res = await app.httpRequest().get('/user?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].name);
    });
  });

  describe('GET /user/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const res = await app.httpRequest().get(`/user/${user.id}`);
      assert(res.status === 200);
      assert(res.body.name === user.name);
    });
  });

  describe('POST /user', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/user')
        .send({
          name: 'name',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          email: '927395536@qq.com',
          mobile: '18716377335',
          password: '123456',
          prefix: 86,
        });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/user/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.name === 'name');
    });
  });

  describe('DELETE /user/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/user/${user.id}`);
      assert(res.status === 200);
    });
  });
});
