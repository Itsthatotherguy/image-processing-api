import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Endpoints', () => {
  describe('GET /images', () => {
    it('Returns 200 if valid input is provided', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=200&height=200'
      );

      expect(response.status).toBe(200);
    });
  });
});
