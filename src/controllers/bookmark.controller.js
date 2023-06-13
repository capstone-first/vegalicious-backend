import { bookmark as b } from '../services/bookmark.services.js';

export const bookmark = {
  create: async (req, res) => {
    try {
      const { userId } = req.payload;
      const { recipeId } = req.body;
      const existedBookmark = await b.findByRecipeId(recipeId, userId);
      if (existedBookmark.length > 0) {
        return res.status(400).json({
          success: 'error',
          message: 'this recipe is already bookmarked',
        });
      }
      const newBookmark = await b.create({ userId, recipeId });
      res.status(200).json({
        success: 'success',
        message: 'create bookmark successfully',
        data: newBookmark,
      });
    } catch (error) {
      res.status(500).json({
        success: 'error',
        message: 'create bookmark failed',
        data: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBookmark = await b.delete(id);
      res.status(200).json({
        success: 'success',
        message: 'delete bookmark successfully',
        data: deletedBookmark,
      });
    } catch (error) {
      res.status(500).json({
        success: 'error',
        message: 'delete bookmark failed',
        data: error.message,
      });
    }
  },
  getBookmarkByUserId: async (req, res) => {
    try {
      const { userId } = req.payload;
      const bookmarkList = await b.getByUserId(userId);
      res.status(200).json({
        success: 'success',
        message: 'get bookmark list successfully',
        data: bookmarkList,
      });
    } catch (error) {
      res.status(500).json({
        success: 'error',
        message: 'get bookmark list failed',
        data: error.message,
      });
    }
  },
};
