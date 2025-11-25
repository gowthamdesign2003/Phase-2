import request from 'supertest';
import express from 'express';
import jobRoutes from '../routes/jobRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/jobs', jobRoutes);

describe('GET /api/jobs', () => {
  it('should return 200 and array', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
