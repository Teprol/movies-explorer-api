const movieRouter = require('express').Router();
const { validCreateMovie, validDeleteMovie } = require('../utils/validations');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// @ возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

// @ создаёт фильм с переданными в теле
movieRouter.post('/', validCreateMovie, createMovie);

// @ удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', validDeleteMovie, deleteMovie);

module.exports = movieRouter;
