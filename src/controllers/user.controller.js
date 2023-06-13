import { findUserById, updateUserById } from '../services/users.services.js';

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.status(200);
    res.json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.payload;
    // validate body
    const { height, name, weight } = req.body;
    if (!height || !name || !weight) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Invalid request body',
      });
    }
    // find user
    const user = await findUserById(userId);
    // if user does not exist
    if (!user) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'User not found',
      });
    }
    // if user exists
    const updatedUser = await updateUserById(userId, req.body);
    res.status(200);
    res.json({
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'User not updated',
      data: err.message,
    });
  }
};
