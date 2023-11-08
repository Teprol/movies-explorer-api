const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user'); // модель пользователя

// секретный ключ
const { SECRET_KEY } = require('../utils/config');

// ошибки
const BadRequestError = require('../errors/BadRequestError');
const DataAlready = require('../errors/DataAlready');
const NotFoundError = require('../errors/NotFoundError');

// @ информация о текущем пользователе
const getUserProfile = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

// @ обновление информации о пользователе
const updateMeProfile = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, email } = req.body;

  userModel
    .findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении информации о пользователе'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с указанным id не найден'));
      } else {
        next(err);
      }
    });
};

// @ создание пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    // создадим пользователя
    userModel
      .create({
        name,
        email,
        password: hash,
      })
      .then((newUser) => {
        // выведем все кроме пароля
        res.send({
          name: newUser.name, email: newUser.email,
        });
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError('Переданы некоректные данные при создании пользователя'));
        } else if (err.code === 11000) {
          next(new DataAlready('Пользователь с таким email уже зарегистрирован'));
        }
        next(err);
      });
  });
};

// @ авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateMeProfile,
  login,
  getUserProfile,
};
