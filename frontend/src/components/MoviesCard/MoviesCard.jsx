import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MoviesCard.css";

import image from "../../images/pic__COLOR_pic.jpg";
import Button from "../Button/Button";

function MoviesCard({ className, dataMovie, saveMovie, addMovie, deliteMovie }) {
  // const [isMovieSave, setMovieSave] = React.useState(false);
  // проверка на лайк
  const isLiked = saveMovie ? saveMovie.find((item) => item.movieId === dataMovie.id) : false;
  // следим за адресом
  const { pathname } = useLocation(); //отселдить урл

  // функция конвертирует время
  function convertsTime(time) {
    const hours = Math.floor(parseInt(time) / 60);
    const minutes = Math.floor(parseInt(time) % 60);
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className={className}>
      <article className="movies-card">
        <div className="movies-card__header">
          <h2 className="movies-card__title">{dataMovie.nameRU}</h2>
          <p className="movies-card__date">
            {convertsTime(dataMovie.duration)}
          </p>
        </div>
        <a
          href={dataMovie.trailerLink}
          className="link movies-card__link hover"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movies-card__image image"
            src={pathname === '/movies' ? `https://api.nomoreparties.co${dataMovie.image.url}` : dataMovie.image}
            alt={dataMovie.name}
          />
        </a>
        {pathname === "/saved-movies" ? (
          <Button
            className="movies-card__button button hover button_card-delete"
            type="button"
            onClick={() => deliteMovie(dataMovie._id)}
          ></Button>
        ) : (
          <Button
            className={`movies-card__button button hover ${isLiked ? "button_card-save" : "button_card"
              }`}
            type="button"
            onClick={() => addMovie(dataMovie)}
          >
            {isLiked ? "" : "Сохранить"}
          </Button>
        )}
      </article>
    </li>
  );
}

export default MoviesCard;
