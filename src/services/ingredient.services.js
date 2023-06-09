import { db } from '../utils/db.js';

export const createIngredient = async (ingredient) => {
  return await db.ingredient.create({
    data: {
      name: ingredient,
    },
  });
};

export const getAllIngredients = async () => {
  return await db.ingredient.findMany();
};

export const getIngredientById = async (id) => {
  return await db.ingredient.findUnique({
    where: {
      id,
    },
  });
};

export const updateIngredientById = async (id, ingredient) => {
  return await db.ingredient.update({
    where: {
      id,
    },
    data: {
      name: ingredient,
    },
  });
};

export const deleteIngredientById = async (id) => {
  return await db.ingredient.delete({
    where: {
      id,
    },
  });
};
