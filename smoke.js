const request = require('supertest');
const app = require('./server/app');

(async () => {
  // GET should return initial note
  const getRes = await request(app).get('/api/notes').expect(200);
  if (!Array.isArray(getRes.body)) throw new Error('GET did not return array');

  // POST a new note
  const postRes = await request(app)
    .post('/api/notes')
    .send({ title: 'Test', content: 'Hello' })
    .set('Content-Type', 'application/json')
    .expect(201);
  const newId = postRes.body.id;
  if (!newId) throw new Error('POST did not return id');

  // DELETE the created note
  await request(app).delete(`/api/notes/${newId}`).expect(200);

  console.log('SMOKE OK');
})().catch(err => { console.error('SMOKE FAIL', err.message); process.exit(1); });

