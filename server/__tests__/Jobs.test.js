import request from 'supertest';

let app;

beforeAll(async () => {
    // Dynamically imported so App.js runs after setup.js's beforeAll has set MONGO_URI
    const { default: appModule } = await import('../src/App.js');
    app = appModule;
});

describe('Main Route', () => {
    it('GET / responds with 200', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });

    it('GET /jobs responds with 200 and an array', async () => {
        const res = await request(app).get('/jobs');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// Helper to create a job
const createJob = (overrides = {}) =>
    request(app)
        .post('/jobs')
        .send({ title: 'Default Job', content: 'Some content', category: 'Tech', ...overrides });

describe('POST /jobs', () => {
    it('creates a job and returns it', async () => {
        const res = await createJob({ title: 'Software Engineer', content: 'Build stuff', category: 'Tech' });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Software Engineer');
        expect(res.body.content).toBe('Build stuff');
        expect(res.body.category).toBe('Tech');
    });

    it('auto-generates a slug from the title', async () => {
        const res = await createJob({ title: 'Senior Dev Ops' });

        expect(res.body.slug).toBe('senior-dev-ops');
    });
});

describe('GET /jobs', () => {
    it('returns an empty array when no jobs exist', async () => {
        const res = await request(app).get('/jobs');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('returns all jobs', async () => {
        await createJob({ title: 'Job One' });
        await createJob({ title: 'Job Two' });

        const res = await request(app).get('/jobs');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });
});

describe('GET /jobs?search=', () => {
    beforeEach(async () => {
        await createJob({ title: 'Frontend Developer' });
        await createJob({ title: 'Backend Engineer' });
    });

    it('returns jobs matching the search term case-insensitively', async () => {
        const res = await request(app).get('/jobs?search=frontend');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].title).toBe('Frontend Developer');
    });

    it('returns partial matches', async () => {
        const res = await request(app).get('/jobs?search=engineer');

        expect(res.status).toBe(200);
        expect(res.body[0].title).toBe('Backend Engineer');
    });

    it('returns 404 when no jobs match', async () => {
        const res = await request(app).get('/jobs?search=nonexistent');

        expect(res.status).toBe(404);
    });
});

describe('GET /jobs/:identifier', () => {
    let createdJob;

    beforeEach(async () => {
        const res = await createJob({ title: 'DevOps Lead', content: 'Manage infra', category: 'Ops' });
        createdJob = res.body;
    });

    it('gets a job by slug', async () => {
        const res = await request(app).get(`/jobs/${createdJob.slug}`);

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('DevOps Lead');
    });

    it('gets a job by MongoDB id', async () => {
        const res = await request(app).get(`/jobs/${createdJob._id}`);

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('DevOps Lead');
    });

    it('returns 404 for an unknown identifier', async () => {
        const res = await request(app).get('/jobs/unknown-slug');

        expect(res.status).toBe(404);
    });
});

describe('DELETE /jobs/:identifier', () => {
    it('deletes a job by id', async () => {
        const { body: created } = await createJob({ title: 'To Be Deleted' });

        const res = await request(app).delete(`/jobs/${created._id}`);
        expect(res.status).toBe(200);

        const check = await request(app).get(`/jobs/${created._id}`);
        expect(check.status).toBe(404);
    });

    it('returns 404 when job does not exist', async () => {
        const res = await request(app).delete('/jobs/000000000000000000000000');

        expect(res.status).toBe(404);
    });
});

describe('PUT /jobs', () => {
    let createdJob;

    beforeEach(async () => {
        const res = await createJob({ title: 'Original Title', content: 'Original content' });
        createdJob = res.body;
    });

    it('updates job content', async () => {
        const res = await request(app)
            .put('/jobs')
            .send({ id: createdJob._id, content: { content: 'Updated content' } });

        expect(res.status).toBe(200);
        expect(res.body.content).toBe('Updated content');
    });

    it('regenerates the slug when title is updated', async () => {
        const res = await request(app)
            .put('/jobs')
            .send({ id: createdJob._id, content: { title: 'Updated Title' } });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Updated Title');
        expect(res.body.slug).toBe('updated-title');
    });

    it('does not change the slug when title is not updated', async () => {
        const res = await request(app)
            .put('/jobs')
            .send({ id: createdJob._id, content: { content: 'New content only' } });

        expect(res.status).toBe(200);
        expect(res.body.slug).toBe('original-title');
    });

    it('returns 404 for a non-existent id', async () => {
        const res = await request(app)
            .put('/jobs')
            .send({ id: '000000000000000000000000', content: { title: 'Ghost' } });

        expect(res.status).toBe(404);
    });
});
