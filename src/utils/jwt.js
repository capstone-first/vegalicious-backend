import jwt from 'jsonwebtoken';

// generate access token for 5m
export function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '100m',
  });
}

// generate refresh token for 8h
export function generateRefreshToken(user, jti) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '8h',
    }
  );
}

export function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);
  return {
    accessToken,
    refreshToken,
  };
}
