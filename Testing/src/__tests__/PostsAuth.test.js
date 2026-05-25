import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../models/user.js';
import Post from '../models/posts.js';

let mongoServer;
let authCookie;
let createdPostId;

//! -------------- Setup & Teardown -----------------------------------------------

beforeAll(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    // Register
    await request(app).post('/api/v1/register').send({
        name: 'Ranit Dev',
        email: 'ranit@example.com',
        password: 'Password1',
    });

    // Login and capture cookie
    const loginRes = await request(app).post('/api/v1/login').send({
        email: 'ranit@example.com',
        password: 'Password1',
    });

    authCookie = loginRes.headers['set-cookie'];
});

//! -------------------- Helper --------------------------------------

const validPost = {
    title: 'This is a valid title',
    content: 'Ranit is a very good boy and loves coding every day',
};

const createPost = (cookie, body = validPost) =>
    request(app)
        .post('/api/v1/posts')
        .set('Cookie', cookie)
        .send(body);

//! -------------------- Create Post --------------------------------------------

describe('POST /api/v1/posts', () => {

    test('should create a post successfully', async () => {
        const res = await createPost(authCookie);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.post).toHaveProperty('_id');
        expect(res.body.post.title).toBe(validPost.title);
    });

    test('should save post to the user posts array', async () => {
        const res = await createPost(authCookie);
        const postId = res.body.post._id;
        const user = await User.findOne({ email: 'ranit@example.com' });
        expect(user.posts.map(String)).toContain(postId);
    });

    test('should return 401 if not logged in', async () => {
        const res = await request(app).post('/api/v1/posts').send(validPost);
        expect(res.statusCode).toBe(401);
    });

    test('should fail with missing title', async () => {
        const res = await createPost(authCookie, { content: validPost.content });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail with missing content', async () => {
        const res = await createPost(authCookie, { title: validPost.title });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail with short title (less than 5 chars)', async () => {
        const res = await createPost(authCookie, { ...validPost, title: 'Hi' });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail with title longer than 100 chars', async () => {
        const res = await createPost(authCookie, { ...validPost, title: 'A'.repeat(101) });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    test('should fail with short content (less than 20 chars)', async () => {
        const res = await createPost(authCookie, { ...validPost, content: 'Too short' });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });
});

//! -------------------- Get All Posts --------------------------------------------

describe('GET /api/v1/posts', () => {

    test('should return empty array when no posts', async () => {
        const res = await request(app).get('/api/v1/posts').set('Cookie', authCookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.posts).toEqual([]);
    });

    test('should return all posts for the logged in user', async () => {
        await createPost(authCookie);
        await createPost(authCookie, {
            title: 'Second post title here',
            content: 'This is the second post content for testing purposes',
        });
        const res = await request(app).get('/api/v1/posts').set('Cookie', authCookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.posts).toHaveLength(2);
    });

    test('should return 401 if not logged in', async () => {
        const res = await request(app).get('/api/v1/posts');
        expect(res.statusCode).toBe(401);
    });

    test('should only return posts belonging to the logged in user', async () => {
        await createPost(authCookie); // ranit's post

        // second user
        await request(app).post('/api/v1/register').send({
            name: 'Other User',
            email: 'other@example.com',
            password: 'Password1',
        });
        const otherLogin = await request(app).post('/api/v1/login').send({
            email: 'other@example.com',
            password: 'Password1',
        });
        const otherCookie = otherLogin.headers['set-cookie'];

        const res = await request(app).get('/api/v1/posts').set('Cookie', otherCookie);
        expect(res.body.posts).toHaveLength(0);
    });
});

//! -------------------- Update Post --------------------------------------------

describe('PUT /api/v1/posts/:id', () => {

    beforeEach(async () => {
        const res = await createPost(authCookie);
        createdPostId = res.body.post._id;
    });

    test('should update post successfully', async () => {
        const res = await request(app)
            .put(`/api/v1/posts/${createdPostId}`)
            .set('Cookie', authCookie)
            .send({ title: 'Updated title here', content: 'Updated content that is long enough to pass validation rules' });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.post.title).toBe('Updated title here');
    });

    test('should return 404 for non-existent post id', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/api/v1/posts/${fakeId}`)
            .set('Cookie', authCookie)
            .send(validPost);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Post Not Found');
    });

    test('should not allow updating another user\'s post', async () => {
        await request(app).post('/api/v1/register').send({
            name: 'Other User', email: 'other@example.com', password: 'Password1',
        });
        const otherLogin = await request(app).post('/api/v1/login').send({
            email: 'other@example.com', password: 'Password1',
        });
        const res = await request(app)
            .put(`/api/v1/posts/${createdPostId}`)
            .set('Cookie', otherLogin.headers['set-cookie'])
            .send(validPost);
        expect(res.statusCode).toBe(404);
    });

    test('should return 401 if not logged in', async () => {
        const res = await request(app).put(`/api/v1/posts/${createdPostId}`).send(validPost);
        expect(res.statusCode).toBe(401);
    });

    test('should fail validation with short title on update', async () => {
        const res = await request(app)
            .put(`/api/v1/posts/${createdPostId}`)
            .set('Cookie', authCookie)
            .send({ title: 'Hi', content: validPost.content });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });
});

//! -------------------- Delete Post ----------------------------------------

describe('DELETE /api/v1/posts/:id', () => {

    beforeEach(async () => {
        const res = await createPost(authCookie);
        createdPostId = res.body.post._id;
    });

    test('should delete post successfully', async () => {
        const res = await request(app)
            .delete(`/api/v1/posts/${createdPostId}`)
            .set('Cookie', authCookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Post Deleted Successfully');
    });

    test('should actually remove post from database', async () => {
        await request(app).delete(`/api/v1/posts/${createdPostId}`).set('Cookie', authCookie);
        const post = await Post.findById(createdPostId);
        expect(post).toBeNull();
    });

    test('should return 404 for non-existent post id', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .delete(`/api/v1/posts/${fakeId}`)
            .set('Cookie', authCookie);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Post Not Found');
    });

    test('should not allow deleting another user\'s post', async () => {
        await request(app).post('/api/v1/register').send({
            name: 'Other User', email: 'other@example.com', password: 'Password1',
        });
        const otherLogin = await request(app).post('/api/v1/login').send({
            email: 'other@example.com', password: 'Password1',
        });
        const res = await request(app)
            .delete(`/api/v1/posts/${createdPostId}`)
            .set('Cookie', otherLogin.headers['set-cookie']);
        expect(res.statusCode).toBe(404);
    });

    test('should return 401 if not logged in', async () => {
        const res = await request(app).delete(`/api/v1/posts/${createdPostId}`);
        expect(res.statusCode).toBe(401);
    });
});