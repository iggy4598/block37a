const request = require('supertest');
const app = require('../app');

let commentToken;

beforeAll(async () => {
  await request(app).post('/api/auth/register').send({ username: 'commenter', password: 'password123' });
  const res = await request(app).post('/api/auth/login').send({ username: 'commenter', password: 'password123' });
  commentToken = res.body.token;
});

describe('Comments API Tests', () => {
  test('Create a comment on a review', async () => {
    const itemId = 1;
    const reviewId = 1;
    const res = await request(app)
      .post(`/api/items/${itemId}/reviews/${reviewId}/comments`)
      .set('Authorization', `Bearer ${commentToken}`)
      .send({ content: 'Nice review!' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('content', 'Nice review!');
  });

  test('Get all comments by user', async () => {
    const res = await request(app)
      .get('/api/comments/me')
      .set('Authorization', `Bearer ${commentToken}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});