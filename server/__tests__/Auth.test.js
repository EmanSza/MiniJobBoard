import request from 'supertest';

let app;

beforeAll(async () => {
    const { default: appModule } = await import('../src/App.js');
    app = appModule;
});

const validUser = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'Password1!',
};

describe('POST /auth/register', () => {
    it('registers a user with valid data', async () => {
        const res = await request(app).post('/auth/register').send(validUser);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'User successfully created' });
    });

    it('returns 409 when email is already taken', async () => {
        await request(app).post('/auth/register').send(validUser);

        const res = await request(app)
            .post('/auth/register')
            .send({ ...validUser, username: 'otheruser' });

        expect(res.status).toBe(409);
        expect(res.body.error).toBe('Email is already in use');
    });

    it('returns 409 when username is already taken', async () => {
        await request(app).post('/auth/register').send(validUser);

        const res = await request(app)
            .post('/auth/register')
            .send({ ...validUser, email: 'other@example.com' });

        expect(res.status).toBe(409);
        expect(res.body.error).toBe('Username is already in use');
    });
});
