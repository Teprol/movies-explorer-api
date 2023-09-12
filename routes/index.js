const router = require('express').Router();
const authRout = require('./auth');
const userRout = require('./user');
const movieRout = require('./movie');
const auth = require('../middlewares/auth');
// ошибки
const NotFoundError = require('../errors/NotFoundError');
// валидация

// @ роуты регестрации
router.use('/', authRout);

// @ роут авторизация
router.use(auth);

// @ роут пользователя
router.use('/users', userRout);

// @ роут фильмов
// router.use('/movies', movieRout);

// @ страница не найдена
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
