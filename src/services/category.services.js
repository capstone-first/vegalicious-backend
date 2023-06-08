import { db } from '../utils/db.js';
export const createCategory = async (category) => {
  return await db.category.create({
    data: {
      name: category,
    },
  });
};

export const findAllCategories = async () => {
  return await db.category.findMany();
};

export const findCategoryById = async (id) => {
  return await db.category.findUnique({
    where: {
      id,
    },
  });
};

export const findCategoryByName = async (name) => {
  return await db.category.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const editCategoryById = async (id, category) => {
  return await db.category.update({
    where: {
      id,
    },
    data: {
      name: category,
    },
  });
};

export const deleteCategoryById = async (id) => {
  return await db.category.delete({
    where: {
      id,
    },
  });
};
