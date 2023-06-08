import express from 'express';
const router = express.Router();
// auth controller
import { register, login } from '../controllers/auth.controller.js';
import { getProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/middlewares.js';
import {
  storeCategory,
  getCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  destroyCategory,
} from '../controllers/category.controller.js';
router.post('/login', login);
router.post('/register', register);
router.get('/profile', isAuthenticated, getProfile);

// category
router.get('/category', isAuthenticated, getCategories);
router.post('/category/create', isAuthenticated, storeCategory);
router.get('/category/:id', isAuthenticated, getCategoryById);
router.get('/category/name/:name', isAuthenticated, getCategoryByName);
router.put('/category/:id', isAuthenticated, updateCategory);
router.delete('/category/:id', isAuthenticated, destroyCategory);
export default router;
