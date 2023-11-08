const mongoose = require('mongoose');
const movieModel = require('../models/movie');
// ошибки
const BadRequestError = require('../errors/BadRequestError');
const RightsError = require('../errors/RightsError');
const NotFoundError = require('../errors/NotFoundError');

// @ возвращает все сохранённые текущим пользователем фильмы GET
const getMovies = (req, res, next) => {
  movieModel.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// @ создаёт фильм с переданными в теле POST
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: _id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      res.send(err);
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// @ удаляет сохранённый фильм по id DELETE
const deleteMovie = (req, res, next) => {
  movieModel.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new RightsError('Вы не можете удалять чужие карточки'));
      }
      movieModel
        .findByIdAndRemove(req.params.movieId)
        .orFail()
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new BadRequestError('Некорректный id'));
          } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
            next(new NotFoundError('Карточка с указанным id не найдена'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
