'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  let token = '';
  let user_id = 0;

  describe('POST /user/register', () => {
    it('should work', async () => {
      const res = await app.httpRequest().post('/user/register')
        .send({
          name: 'test',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          email: 'test@qq.com',
          mobile: '18716377335',
          password: '123456',
          prefix: 86,
        });
      assert(res.status === 201);
    });
  });

  describe('POST /user/login', () => {
    it('should work', async () => {
      const res = await app.httpRequest().post('/user/login')
        .send({
          email: 'test@qq.com',
          password: '123456',
        });
      assert(res.status === 201);
      console.log(res.data);
      assert(res.data.token);
      token = res.data.token;
    });
  });

  describe('GET /user/current', () => {
    it('should work', async () => {
      const res = await app.httpRequest().get('/user/current').set('Authorization', 'Bearer ' + token);
      assert(res.status === 201);
      assert(res.data.id);
      if (res.data.id) {
        user_id = res.data.id;
      }
    });
  });

  describe('DELETE /user/:id', () => {
    it('should work', async () => {
      assert(user_id);
      if (user_id) {
        const res = await app.httpRequest().delete(`/user/${user_id}`).set('Authorization', 'Bearer ' + token);
        assert(res.status === 200);
      }
    });
  });
});
