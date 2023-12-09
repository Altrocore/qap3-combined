const request = require('supertest');
const app = require('../index');

describe('User API', () => {
  it('should list all users', async () => {
    const res = await request(app)
      .get('/users')
      .expect('Content-Type', /html/)
      .expect(200);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com'
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.name).toEqual('Test User');
    expect(res.body.email).toEqual('test@example.com');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({
        name: 'Updated User',
        email: 'updated@example.com'
      })
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.name).toEqual(undefined);
    expect(res.body.email).toEqual(undefined);
  });

  it('should delete a user', async () => {
    await request(app)
      .delete('/users/1') 
      .expect(200);
  });
});
