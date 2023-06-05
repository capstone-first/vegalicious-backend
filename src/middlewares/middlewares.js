import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const barierToken = req.headers['authorization'];
  let token;

  try {
    token = bearerToken.split(' ')[1];
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: err.message,
      });
    }
    req.user = decoded.id;
    next();
  });
};

export function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error('🚫 Un-Authorized 🚫');
  }

  return next();
}
