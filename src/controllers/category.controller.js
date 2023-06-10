import {
  createCategory,
  findAllCategories,
  findCategoryById,
  findCategoryByName,
  editCategoryById,
  deleteCategoryById,
} from '../services/category.services.js';
export const storeCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  try {
    await createCategory(name);
    res
      .status(201)
      .json({ status: 'success', message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await findAllCategories();
    res.status(200).json({ status: 'success', data: categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(422).json({ message: 'Id is requireds' });
  try {
    const category = await findCategoryById(id);
    if (!category)
      return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCategoryByName = async (req, res) => {
  const name = req.params.name;
  if (!name) return res.status(422).json({ message: 'Name is required' });
  try {
    const category = await findCategoryByName(name);
    if (!category)
      return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(422).json({ message: 'Name is required' });
  try {
    const thatCategory = await findCategoryById(req.params.id);
    if (!thatCategory)
      return res.status(404).json({ message: 'Category not found' });
    const category = await editCategoryById(req.params.id, name);
    res.status(200).json({ status: 'success', data: category });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const destroyCategory = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(422).json({ message: 'Id is required' });
  try {
    const thatCategory = await findCategoryById(req.params.id);
    if (!thatCategory)
      return res
        .status(404)
        .json({ status: 'error', message: 'Category not found' });
    await deleteCategoryById(id);
    res.status(200).json({ status: 'success', message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
