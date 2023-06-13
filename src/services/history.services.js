import { db } from '../utils/db.js';

export const history = {
  storeUserHistory: async (userId, recipeId) => {
    return await db.userHistoryRecipe.create({
      data: {
        userId: userId,
        recipeId: recipeId,
      },
    });
  },
  getUserHistory: async (userId) => {
    return await db.userHistoryRecipe.findMany({
      select: {
        id: true,
        createdAt: true,
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
      },
      where: {
        userId: userId,
      },
    });
  },
};
