const request = require('supertest');
const app = require('../app');
const { prisma } = require('../database');

describe('Auth API Tests', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });
  test('Register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
  test('Login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  test('Login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toBe('Invalid credentials');
  });
});