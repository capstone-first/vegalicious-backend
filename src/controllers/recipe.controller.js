import { recipe2 as r } from '../services/recipe.services.js';

export const recipe2 = {
  getAll: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const limit = 20;
      let skip = (page - 1) * limit;
      const recipes = await r.getAll(parseInt(limit), skip);
      const total = await r.count();
      const totalPages = Math.ceil(total / limit);
      const responseRecipes = [];
      recipes.map((recipe) => {
        responseRecipes.push({
          id: recipe.id,
          title: recipe.title ?? '',
          category: JSON.parse(recipe.categories) ?? [],
          image: recipe.image ?? '',
          ingredients: JSON.parse(recipe.ingredients) ?? [],
          directions: JSON.parse(recipe.directions) ?? [],
          description: recipe.desc ?? '',
          createdAt: recipe.createdAt ?? '',
          updatedAt: recipe.updatedAt ?? '',
        });
      });
      res.status(200).json({
        status: 'success',
        currentPage: page - 0,
        totalPages: totalPages,
        totalData: total,
        data: responseRecipes,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getCategory: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const limit = 10;
      let skip = (page - 1) * limit;
      const total = await r.count();
      const categories = await r.getByCategory(parseInt(limit), skip);
      const responseCategories = [];
      const totalPages = Math.ceil(total / limit);
      categories.map((category) => {
        const categoryJSON =
          JSON.parse(decodeURIComponent(category.categories)) ?? [];
        responseCategories.push(categoryJSON.flat());
      });
      res.status(200).json({
        status: 'success',
        currentPage: page - 0,
        totalPages: totalPages,
        totalData: total,
        data: [...new Set(responseCategories.flat())], // remove duplicate
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: 'error', message: error.name + '||' + error.message });
    }
  },
};
