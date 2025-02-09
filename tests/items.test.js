const request = require('supertest');
const app = require('../app');

describe('Items API Tests', () => {
  test('Get all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Get specific item by ID', async () => {
    const itemId = 1;
    const res = await request(app).get(`/api/items/${itemId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', itemId);
  });

  test('Get reviews for an item', async () => {
    const itemId = 1;
    const res = await request(app).get(`/api/items/${itemId}/reviews`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});