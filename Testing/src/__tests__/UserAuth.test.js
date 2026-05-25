import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../models/user.js';

let mongoServer;

//! -------------------- Setup & Teardown -----------------------------------------------

beforeAll(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

//! -------------------- Helper ----------------------------------------------------------

const validUser = {
    name: 'Ranit Dev',
    email: 'ranit@example.com',
    password: 'Password1',
};

const registerUser = () =>
    request(app).post('/api/v1/register').send(validUser);

const loginUser = () =>
    request(app).post('/api/v1/login').send({
        email: validUser.email,
        password: validUser.password,
    });

//! -------------------- Register ---------------------------------------------------

describe('POST /api/v1/register', () => {

    test('should register a new user successfully', async () => {
        const res = await registerUser();
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user.email).toBe(validUser.email);
    });

    test('should set httpOnly cookie with token on successful registration', async () => {
        const res = await registerUser();
        expect(res.headers['set-cookie']).toBeDefined();
        expect(res.headers['set-cookie'][0]).toMatch(/token=/);
        expect(res.headers['set-cookie'][0]).toMatch(/HttpOnly/i);
    });

    test('should fail registration with duplicate email', async () => {
        await registerUser();
        const res = await registerUser();
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('User already exists');
    });

    test('should fail registration with missing fields', async () => {
        const res = await request(app).post('/api/v1/register').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail registration with invalid email format', async () => {
        const res = await request(app).post('/api/v1/register').send({
            ...validUser,
            email: 'not-an-email',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail registration with weak password (too short)', async () => {
        const res = await request(app).post('/api/v1/register').send({
            ...validUser,
            password: 'Pass1',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail registration with password missing uppercase letter', async () => {
        const res = await request(app).post('/api/v1/register').send({
            ...validUser,
            password: 'password1',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail registration with password missing number', async () => {
        const res = await request(app).post('/api/v1/register').send({
            ...validUser,
            password: 'Password',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should not return password in response', async () => {
        const res = await registerUser();
        expect(res.statusCode).toBe(201);
        expect(res.body.user).not.toHaveProperty('password');
    });
});

//! -------------------- Login ------------------------------------------------

describe('POST /api/v1/login', () => {

    beforeEach(async () => {
        await registerUser();
    });

    test('should login successfully with correct credentials', async () => {
        const res = await loginUser();
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('User logged in successfully');
        expect(res.body.user.email).toBe(validUser.email);
    });

    test('should set httpOnly cookie with token on successful login', async () => {
        const res = await loginUser();
        expect(res.statusCode).toBe(200);
        expect(res.headers['set-cookie']).toBeDefined();
        expect(res.headers['set-cookie'][0]).toMatch(/token=/);
        expect(res.headers['set-cookie'][0]).toMatch(/HttpOnly/i);
    });

    test('should fail login with incorrect password', async () => {
        const res = await request(app).post('/api/v1/login').send({
            email: validUser.email,
            password: 'WrongPass1',
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid credentials');
    });

    test('should fail login with non-existent email', async () => {
        const res = await request(app).post('/api/v1/login').send({
            email: 'nobody@example.com',
            password: validUser.password,
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid credentials');
    });

    test('should fail login with missing fields', async () => {
        const res = await request(app).post('/api/v1/login').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail login with invalid email format', async () => {
        const res = await request(app).post('/api/v1/login').send({
            email: 'bad-email',
            password: validUser.password,
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });
});

//! -------------------- Logout --------------------------------------------------

describe('POST /api/v1/logout', () => {

    let authCookie;

    beforeEach(async () => {
        await registerUser();
        const loginRes = await loginUser();
        // guard: if login failed, authCookie stays undefined and tests will fail clearly
        authCookie = loginRes.headers['set-cookie'];
    });

    test('should logout successfully when user is logged in', async () => {
        const res = await request(app)
            .post('/api/v1/logout')
            .set('Cookie', authCookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('User logged out successfully');
    });

    test('should clear the token cookie on logout', async () => {
        const res = await request(app)
            .post('/api/v1/logout')
            .set('Cookie', authCookie);
        const setCookie = res.headers['set-cookie']?.[0] ?? '';
        expect(setCookie).toMatch(/token=(?:;|$)/i);
    });

    test('should return 401 if not logged in', async () => {
        const res = await request(app).post('/api/v1/logout');
        expect(res.statusCode).toBe(401);
    });
});