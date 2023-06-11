import { db } from '../utils/db.js';

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
};
