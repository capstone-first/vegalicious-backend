import { findUserById } from '../services/users.services.js';

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
