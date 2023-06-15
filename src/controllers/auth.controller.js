import {
  findUserByEmail,
  createUserByEmailAndPassword,
} from '../services/users.services.js';
import { addRefreshTokenToWhiteList } from '../services/auth.services.js';
import { generateTokens } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400);
      res.json({
        status: 'success',
        message: 'You must provide email and password',
      });
      throw new Error('You must provide email and password');
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400);
      res.json({ status: 'success', message: 'User already exists' });
      throw new Error('User already exists');
    }

    const user = await createUserByEmailAndPassword({ email, password, name });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });
    res.json({
      status: 'success',
      message: 'User created successfully',
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      data: err.message,
    });
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide email and password');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(400);
      res.json({ status: 'error', message: 'User does not exist' });
      throw new Error('User does not exist');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      res.json({ status: 'error', message: 'Invalid login credentials' });
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      status: 'success',
      message: 'User logged in successfully',
      data: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      data: err.message,
    });
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Refresh token is required');
    }
    await removeRefreshTokenFromWhiteList(refreshToken);
    res.json({
      status: 'success',
      message: 'User logged out successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Logout failed',
      data: err.message,
    });
    next(err);
  }
}