const authRouter = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../utils/validations');

// @ авторизация
authRouter.post('/signin', validateLogin, login);

// @ регистрация
authRouter.post('/signup', validateCreateUser, createUser);

module.exports = authRouter;
