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
import { ingredient } from '../controllers/ingredient.controller.js';
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

// ingredient
router.post('/ingredient', isAuthenticated, ingredient.create);
router.get('/ingredient', isAuthenticated, ingredient.getAll);
router.get('/ingredient/:id', isAuthenticated, ingredient.getById);
router.put('/ingredient/:id', isAuthenticated, ingredient.updateById);
router.delete('/ingredient/:id', isAuthenticated, ingredient.deleteById);
export default router;
