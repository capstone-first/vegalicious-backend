import { db } from '../utils/db.js';

export const recipe = {
  count: async () => {
    return await db.recipe.count({ where: { NOT: { title: '' } } });
  },
  getAll: async (limit, skip) => {
    return await db.recipe.findMany({
      // make paginations
      take: limit,
      skip: skip,
      // where not title = null
    });
  },
  getById: async (id) => {
    return await db.recipe.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        image: true,
        fat: true,
        calories: true,
        sodium: true,
        rating: true,
        RecipeCategory: {
          select: {
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        RecipeIngredient: {
          select: {
            Ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        RecipeDirection: {
          select: {
            Direction: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  getByTitle: async (title) => {
    return await db.recipe.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  },
  countByCategory: async (categories) => {
    let mapCategories = [];
    if (typeof categories === 'object') {
      mapCategories = categories.map((category) => category);
    } else {
      mapCategories.push(categories);
    }
    return await db.recipe.count({
      where: {
        RecipeCategory: {
          some: {
            Category: {
              name: {
                in: mapCategories,
              },
            },
          },
        },
      },
    });
  },
  findByCategory: async (limit, skip, categories) => {
    // chekk if categories is array
    let mapCategories = [];
    if (typeof categories === 'object') {
      mapCategories = categories.map((category) => category);
    } else {
      mapCategories.push(categories);
    }
    return await db.recipe.findMany({
      take: limit,
      skip: skip,
      where: {
        RecipeCategory: {
          some: {
            Category: {
              name: {
                in: mapCategories,
              },
            },
          },
        },
      },
    });
  },
};

export const recipe2 = {
  count: async () => {
    return await db.recipe2.count({ where: { NOT: { title: '' } } });
  },
  getAll: async (limit, skip) => {
    return await db.recipe2.findMany({
      // make paginations
      take: limit,
      skip: skip,
      // where not title = null
      where: {
        NOT: {
          title: '',
        },
      },
    });
  },
  recipeQueryRaw: async (limit, skip) => {
    return await db.$queryRaw`
      SELECT * FROM recipe2
      WHERE title <> ''
      LIMIT ${limit}
      OFFSET ${skip}
    `;
  },
  getByCategory: async (limit, skip) => {
    return await db.recipe2.findMany({
      take: limit,
      skip: skip,
      select: {
        categories: true,
      },
    });
  },
  getRecipeById: async (id) => {
    return await db.recipe2.findUnique({
      where: {
        id: id,
      },
    });
  },
  getRecipeByTitle: async (title) => {
    // get by two title
    return await db.recipe2.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  },
};
