import { db } from '../utils/db.js';

export const bookmark = {
  create: async ({ userId, recipeId }) => {
    return await db.bookmarkRecipe.create({
      data: {
        userId: userId,
        recipeId: recipeId,
      },
    });
  },
  delete: async (bookmarkId) => {
    console.log(bookmarkId);
    return await db.bookmarkRecipe.delete({
      where: {
        id: bookmarkId,
      },
    });
  },
  getByUserId: async (userId) => {
    return await db.bookmarkRecipe.findMany({
      select: {
        id: true,
        Recipe: {
          select: {
            id: true,
            title: true,
            image: true,
            fat: true,
            calories: true,
            sodium: true,
            rating: true,
          },
        },
        createdAt: true,
      },
      where: {
        userId: userId,
      },
    });
  },
  findByRecipeId: async (recipeId, userId) => {
    console.log(recipeId, userId);
    return await db.bookmarkRecipe.findMany({
      // where with and oprator
      where: {
        AND: [
          {
            userId: userId,
            recipeId: recipeId,
          },
        ],
      },
    });
  },
};
