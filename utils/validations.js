const { celebrate, Joi } = require('celebrate');
const { validUrl } = require('./constants');

// @ валидация входа
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// @ валидация создания пользователя
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// @ валидация смены информ. пользователя
const validUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

// @ валидация создания фильма
const validCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().length(4).required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(validUrl).required(),
    trailerLink: Joi.string().pattern(validUrl).required(),
    thumbnail: Joi.string().pattern(validUrl).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// @ валидация удаления фильма
const validDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validUserUpdate,
  validCreateMovie,
};
