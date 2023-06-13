import { history as h } from '../services/history.services.js';

export const history = {
  storeUserHistory: async (req, res) => {
    try {
      const { userId, recipeId } = req.body;
      const history = await h.storeUserHistory(userId, recipeId);
      res.json({
        status: 'success',
        message: 'User history stored successfully',
        data: history,
      });
    } catch (err) {
      res.json({
        status: 'error',
        message: 'User history not stored',
        data: err.message,
      });
    }
  },
  getUserHistory: async (req, res) => {
    try {
      const { id } = req.payload;
      const history = await h.getUserHistory(id);
      res.json({
        status: 'success',
        message: 'User history retrieved successfully',
        data: history,
      });
    } catch (err) {
      res.json({
        status: 'error',
        message: 'User history not retrieved',
        data: err.message,
      });
    }
  },
};
