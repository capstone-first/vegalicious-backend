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
      const limit = 20;
      let skip = (page - 1) * limit;
      const recipes = await r.getAll(parseInt(limit), skip);
      const total = await r.count();
      const totalPages = Math.ceil(total / limit);
      res.status(200).json({
        status: 'success',
        currentPage: page - 0,
        totalPages: totalPages,
        totalData: total,
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
      if (!recipe) {
        res.status(404).json({
          status: 'error',
          message: 'Recipe not found',
        });
      }
      res.status(200).json({
        status: 'success',
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
      if (resultRecimendation.length === 0) {
        res.status(404).json({
          status: 'success',
          message: 'No recomendation found',
        });
      }
      console.log(resultRecimendation);
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
            category: eval(recipe.categories),
            image: recipe.image ?? '',
            ingredients: eval(recipe.ingredients),
            directions: eval(recipe.directions),
            description: recipe.desc ?? '',
            createdAt: recipe.createdAt ?? '',
            updatedAt: recipe.updatedAt ?? '',
          });
        } catch (error) {
          console.log(error);
        }
      }

      res.json({
        status: 'success',
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
        data: recipes,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
};

// export const recipe2 = {
//   getAll: async (req, res) => {
//     try {
//       const { page = 1 } = req.query;
//       const limit = 20;
//       let skip = (page - 1) * limit;
//       const recipes = await r.getAll(parseInt(limit), skip);
//       const total = await r.count();
//       const totalPages = Math.ceil(total / limit);
//       const responseRecipes = [];
//       recipes.map((recipe) => {
//         console.log(recipe.directions);
//         responseRecipes.push({
//           id: recipe.id,
//           title: recipe.title ?? '',
//           category: eval(recipe.categories),
//           image: recipe.image ?? '',
//           // ingredients: JSON.parse(recipe.ingredients.replace(/'/g, '"')),
//           // directions: JSON.parse(recipe.directions),
//           description: recipe.desc ?? '',
//           createdAt: recipe.createdAt ?? '',
//           updatedAt: recipe.updatedAt ?? '',
//         });
//       });
//       res.status(200).json({
//         status: 'success',
//         currentPage: page - 0,
//         totalPages: totalPages,
//         totalData: total,
//         data: responseRecipes,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ status: 'error', message: error.message });
//     }
//   },
//   getCategory: async (req, res) => {
//     try {
//       const { page = 1 } = req.query;
//       const limit = 10;
//       let skip = (page - 1) * limit;
//       const total = await r.count();
//       const categories = await r.getByCategory(parseInt(limit), skip);
//       const responseCategories = [];
//       const totalPages = Math.ceil(total / limit);
//       categories.map((category) => {
//         const categoryJSON =
//           JSON.parse(decodeURIComponent(category.categories)) ?? [];
//         responseCategories.push(categoryJSON.flat());
//       });
//       res.status(200).json({
//         status: 'success',
//         currentPage: page - 0,
//         totalPages: totalPages,
//         totalData: total,
//         data: [...new Set(responseCategories.flat())], // remove duplicate
//       });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ status: 'error', message: error.name + '||' + error.message });
//     }
//   },
//   getRecomendation: async (req, res) => {
//     const { sentence } = req.body;
//     try {
//       const recomendations = await axios.post(
//         process.env.ML_API_URL + '/recommend',
//         {
//           sentence: sentence,
//         }
//       );

//       const resultRecimendation = await recomendations.data
//         .topRecommendationRecipes;
//       if (resultRecimendation.length === 0) {
//         res.status(404).json({
//           status: 'success',
//           message: 'No recomendation found',
//         });
//       }
//       let response = [];
//       for (const title of resultRecimendation) {
//         try {
//           let recipe = await r.getRecipeByTitle(title);
//           recipe = recipe[0];
//           response.push({
//             id: recipe.id,
//             title: recipe.title ?? '',
//             category: eval(recipe.categories),
//             image: recipe.image ?? '',
//             ingredients: eval(recipe.ingredients),
//             directions: eval(recipe.directions),
//             description: recipe.desc ?? '',
//             createdAt: recipe.createdAt ?? '',
//             updatedAt: recipe.updatedAt ?? '',
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }

//       res.json({
//         status: 'success',
//         data: response,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ status: 'error', message: error.message });
//     }
//   },
//   getRecipeById: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const recipe = await r.getRecipeById(id);
//       if (recipe.length === 0) {
//         res.status(404).json({
//           status: 'success',
//           message: 'Recipe not found',
//         });
//       }
//       res.status(200).json({
//         status: 'success',
//         data: recipe,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ status: 'error', message: error.message });
//     }
//   },
// };
