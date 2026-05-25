import express from 'express';
import {register, login, logout} from '../controllers/userAuth.js'
import {postCreate, postUpdate, postDelete, getAllPosts} from '../controllers/postAuth.js';
import registerRules from '../validator/registerRules.js';
import loginRules from '../validator/loginRules.js';
import postRules from '../validator/PostRules.js';
import userAuth from '../middleware/uservalidation.js';
import isLoggedIn from '../middleware/isLoggedIn.js';


const router = express.Router();

// User Routes
router.post('/register', registerRules, userAuth, register);
router.post('/login', loginRules, userAuth, login);
router.post('/logout', isLoggedIn, logout);

// Post Routes
router.post('/posts', isLoggedIn, postRules, userAuth, postCreate);
router.put('/posts/:id', isLoggedIn, postRules, userAuth, postUpdate);
router.delete('/posts/:id', isLoggedIn, postDelete);
router.get('/posts', isLoggedIn, getAllPosts);

export default router;