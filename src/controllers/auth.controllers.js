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
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      res.json({ message: 'You must provide email and password' });
      throw new Error('You must provide email and password');
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400);
      res.json({ message: 'User already exists' });
      throw new Error('User already exists');
    }

    const user = await createUserByEmailAndPassword({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
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
      throw new Error('User does not exist');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
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
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};
