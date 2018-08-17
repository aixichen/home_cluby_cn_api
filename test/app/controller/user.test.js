'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  describe('POST /user', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/user')
        .send({
          name: 'name',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          email: '927395537@qq.com',
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

  describe('POST /user/login', () => {
    it('should work', async () => {
      app.mockCsrf();
      const res = await app.httpRequest().post('/user/login')
        .send({
          email: '927395537@qq.com',
          password: '123456',
        });
      assert(res.status === 201);
      assert(res.body.token);
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

  describe('DELETE /user/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/user/${user.id}`);
      assert(res.status === 200);
    });
  });
});
