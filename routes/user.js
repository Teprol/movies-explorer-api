const usersRouter = require('express').Router();
const { validUserUpdate } = require('../utils/validations');
const { updateMeProfile, getUserProfile } = require('../controllers/users');

// @ получении инфы о пользователе
usersRouter.get('/me', getUserProfile);
// @ обоновление инфы пользователя
usersRouter.patch('/me', validUserUpdate, updateMeProfile);

module.exports = usersRouter;
