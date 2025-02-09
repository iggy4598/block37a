const request = require('supertest');
const app = require('../app');
const { prisma } = require('../database');

let token;

beforeAll(async () => {
  await prisma.user.deleteMany();
  await request(app).post('/api/auth/register').send({ username: 'reviewer', password: 'password123' });
  const res = await request(app).post('/api/auth/login').send({ username: 'reviewer', password: 'password123' });
  token = res.body.token;
});

describe('Reviews API Tests', () => {
  test('Create a review for an item', async () => {
    const itemId = 1;
    const res = await request(app)
      .post(`/api/items/${itemId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reviewText: 'Great product!', rating: 5 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('reviewText', 'Great product!');
  });

  test('Get reviews written by user', async () => {
    const res = await request(app)
      .get('/api/reviews/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});