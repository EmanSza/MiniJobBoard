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

// Helper to register a user
const register = (overrides = {}) =>
    request(app).post('/auth/register').send({ ...validUser, ...overrides });

const login = (credentials = {}) =>
    request(app).post('/auth/login').send({ email: validUser.email, password: validUser.password, ...credentials });

describe('POST /auth/register', () => {
    it('registers a user with valid data', async () => {
        const res = await register();

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'User successfully created' });
    });

    it('returns 409 when email is already taken', async () => {
        await register();
        const res = await register({ username: 'otheruser' });

        expect(res.status).toBe(409);
        expect(res.body.error).toBe('Email is already in use');
    });

    it('returns 409 when username is already taken', async () => {
        await register();
        const res = await register({ email: 'other@example.com' });

        expect(res.status).toBe(409);
        expect(res.body.error).toBe('Username is already in use');
    });
});

describe('POST /auth/login', () => {
    beforeEach(async () => {
        await register();
    });

    it('logs in with valid credentials', async () => {
        const res = await login();

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.user.email).toBe(validUser.email);
        expect(res.body.user.password).toBeUndefined();
    });

    it('returns 401 with wrong password', async () => {
        const res = await login({ password: 'WrongPass1!' });

        expect(res.status).toBe(401);
    });

    it('returns 401 with non-existent email', async () => {
        const res = await login({ email: 'nobody@example.com' });

        expect(res.status).toBe(401);
    });
});

describe('DELETE /auth/logout', () => {
    it('logs out an authenticated user and clears the session', async () => {
        const agent = request.agent(app);

        await register();
        await agent.post('/auth/login').send({ email: validUser.email, password: validUser.password });

        const logout = await agent.delete('/auth/logout');
        expect(logout.status).toBe(200);

        // Session should be cleared — /auth/get returns empty object when not authenticated
        const check = await agent.get('/auth/get');
        expect(check.body).toEqual({});
    });
});
