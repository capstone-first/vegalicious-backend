import express from 'express';
const router = express.Router();
// auth controller
import { register, login } from '../controllers/auth.controllers.js';
import { getProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/middlewares.js';
router.post('/login', login);
router.post('/register', register);
router.get('/profile', isAuthenticated, getProfile);

export default router;
