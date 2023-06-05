import { hashToken } from '../utils/hashToken.js';
import { db } from '../utils/db.js';

// use when create refresh token
export const addRefreshTokenToWhiteList = async ({
  jti,
  refreshToken,
  userId,
}) => {
  return await db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId: userId,
    },
  });
};

// verify token
export const findRefreshTokenById = async (id) => {
  return await db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

// delete refresh token after usage
export const deleteRefreshTokenById = async (id) => {
  return await db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

// revoke token
export const revokeTokens = async (userId) => {
  return await db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
