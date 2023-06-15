import express from 'express';
const router = express.Router();
// auth controller
import { register, login } from '../controllers/auth.controller.js';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
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
import { direction } from '../controllers/direction.controller.js';
import { recipe } from '../controllers/recipe.controller.js';
import { history } from '../controllers/history.controller.js';
import { bookmark } from '../controllers/bookmark.controller.js';
router.post('/login', login);
router.post('/register', register);

// user
router.get('/profile', isAuthenticated, getProfile);
router.put('/profile/update', isAuthenticated, updateProfile);

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

// direction
router.post('/direction', isAuthenticated, direction.create);
router.get('/direction', isAuthenticated, direction.getAll);
router.get('/direction/:id', isAuthenticated, direction.getById);
router.put('/direction/:id', isAuthenticated, direction.updateById);
router.delete('/direction/:id', isAuthenticated, direction.deleteById);

// recipe
router.get('/recipe', isAuthenticated, recipe.getAll);
router.post('/recipe/recomendation', isAuthenticated, recipe.getRecomendation);
router.get('/recipe/:id', isAuthenticated, recipe.getById);
router.post('/recipe/category', isAuthenticated, recipe.getByCategory);
router.get('/recipe/:title/find', isAuthenticated, recipe.findByTitle);

// historyPage
router.post('/history/store', isAuthenticated, history.storeUserHistory);
router.get('/history', isAuthenticated, history.getUserHistory);

// bookmark
router.post('/bookmark', isAuthenticated, bookmark.create);
router.get('/bookmark', isAuthenticated, bookmark.getBookmarkByUserId);
router.delete('/bookmark/:id', isAuthenticated, bookmark.delete);
export default router;
