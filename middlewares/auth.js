// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const NoAuthError = require('../errors/NoAuthError');
// ключ
const { SECRET_KEY } = require('../utils/config');

// авторизация через токен
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw next(new NoAuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw next(new NoAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
