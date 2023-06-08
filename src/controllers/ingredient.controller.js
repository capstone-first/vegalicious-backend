import {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredientById,
  deleteIngredientById,
} from '../services/ingredient.services.js';

export const ingredient = {
  create: async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(422).json({ message: 'Name is required' });
    try {
      const newIngredient = await createIngredient(name);
      res
        .status(201)
        .json({ message: 'Ingredient created', data: newIngredient });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const ingredients = await getAllIngredients();
      res.status(200).json({ message: 'All ingredients', data: ingredients });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const ingredient = await getIngredientById(id);
      if (!ingredient)
        return res.status(404).json({ message: 'Ingredient not found' });
      res.status(200).json({ message: 'Ingredient found', data: ingredient });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(422).json({ message: 'Name is required' });
    try {
      const ingredient = await getIngredientById(id);
      if (!ingredient)
        return res.status(404).json({ message: 'Ingredient not found' });
      const updatedIngredient = await updateIngredientById(id, name);
      res
        .status(200)
        .json({ message: 'Ingredient updated', updatedIngredient });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedIngredient = await deleteIngredientById(id);
      res
        .status(200)
        .json({ message: 'Ingredient deleted', deletedIngredient });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
};
