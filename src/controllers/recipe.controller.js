import { recipe as r } from '../services/recipe.services.js';
import jsonlint from 'jsonlint';
import axios from 'axios';

function isValidJson(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

export const recipe = {
  getAll: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const limit = 30;
      let skip = (page - 1) * limit;
      const recipes = await r.getAll(parseInt(limit), skip);
      const total = await r.count();
      const totalPages = Math.ceil(total / limit);
      res.status(200).json({
        status: 'success',
        currentPage: page - 0,
        totalPages: totalPages,
        totalData: total,
        message: recipes.length === 0 ? 'No data found' : 'Data found',
        data: recipes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await r.getById(id);
      res.status(200).json({
        status: 'success',
        message: typeof recipe !== 'object' ? 'No data found' : 'Data found',
        data: recipe,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getRecomendation: async (req, res) => {
    const { sentence } = req.body;
    try {
      const recomendations = await axios.post(
        process.env.ML_API_URL + '/recommend',
        {
          sentence: sentence,
        }
      );

      const resultRecimendation = await recomendations.data
        .topRecommendationRecipes;
      let response = [];
      for (const title of resultRecimendation) {
        try {
          let recipe = await r.getByTitle(title);
          recipe = recipe[0];
          response.push({
            id: recipe.id,
            title: recipe.title ?? 'untitle',
            fat: recipe.fat ?? 0,
            calories: recipe.calories ?? 0,
            sodium: recipe.sodium ?? 0,
            rating: recipe.rating ?? 0,
            RecipeCategory: recipe.RecipeCategory,
            image: recipe.image ?? '',
            description: recipe.desc ?? '',
          });
        } catch (error) {
          console.log(error);
        }
      }

      res.json({
        status: 'success',
        message: response.length === 0 ? 'No data found' : 'Data found',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getByCategory: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const limit = 20;
      let skip = (page - 1) * limit;
      let { category } = req.body;
      if (isValidJson(category)) {
        category = JSON.parse(category);
      }
      const recipes = await r.findByCategory(parseInt(limit), skip, category);
      const total = await r.countByCategory(category);
      const totalPages = Math.ceil(total / limit);
      res.status(200).json({
        status: 'success',
        currentPage: page - 0,
        totalPages: totalPages,
        totalData: total,
        message: recipes.length === 0 ? 'No data found' : 'Data found',
        data: recipes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  findByTitle: async (req, res, next) => {
    try {
      const { title } = req.params;
      const { page = 1 } = req.query;
      const limit = 30;
      let skip = (page - 1) * limit;
      const recipes = await r.getByTitle(title, parseInt(limit), skip);
      const total = recipes.length ?? 0;
      const totalPages = Math.ceil(total / limit) ?? 0;
      res.status(200).json({
        status: 'success',
        currentPage: page - 0,
        totalPages: totalPages ?? 0,
        totalData: total ?? 0,
        message: recipes.length === 0 ? 'No data found' : 'Data found',
        data: recipes ?? [],
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
};
