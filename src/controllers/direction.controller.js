import {
  getAllDirections,
  getDirectionById,
  createDirection,
  updateDirectionById,
  deleteDirectionById,
} from '../services/direction.services.js';

export const direction = {
  create: async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(422).json({ message: 'Name is required' });
    try {
      const newDirection = await createDirection(name);
      res
        .status(201)
        .json({ message: 'Direction created', data: newDirection });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const directions = await getAllDirections();
      res.status(200).json({ message: 'All directions', data: directions });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const direction = await getDirectionById(id);
      if (!direction)
        return res.status(404).json({ message: 'Direction not found' });
      res.status(200).json({ message: 'Direction found', data: direction });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(422).json({ message: 'Name is required' });
    try {
      const direction = await getDirectionById(id);
      if (!direction)
        return res.status(404).json({ message: 'Direction not found' });
      const updatedDirection = await updateDirectionById(id, name);
      res.status(200).json({ message: 'Direction updated', updatedDirection });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedDirection = await deleteDirectionById(id);
      if (!deletedDirection)
        return res.status(404).json({ message: 'Direction not found' });
      res
        .status(200)
        .json({ message: 'Direction deleted', data: deletedDirection });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },
};
