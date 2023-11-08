import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Button from "../Button/Button";
import Preloader from "../Preloader/Preloader"; //прелодер
import { addScren, addMaxScren, initialFilmsMax, initialFilmsMedium, initialFilmsMini, DesktopScreen, TabletScreen, DesktopScreenPorogBot, DesktopScreenPorogTop } from "../../utils/constants.js"

function MoviesCardList({ movieArr, error, isSearchEmpty, saveMovie, addMovie, deliteMovie, isLoading }) {
  const { pathname } = useLocation(); //отселдить урл

  const [count, setCount] = React.useState('')
  const fact = movieArr.slice(0, count)

  //@ проверяет разрешение и смотрит сколько карточек рисовать
  function renderListFilm() {
    const counter = { init: initialFilmsMax, step: addMaxScren }
    if (window.innerWidth < DesktopScreen && window.innerWidth >= TabletScreen) {
      counter.init = initialFilmsMedium
      counter.step = addScren
    }
    if (window.innerWidth > DesktopScreenPorogBot && window.innerWidth < DesktopScreenPorogTop) {
      counter.init = initialFilmsMedium
      counter.step = addScren
    }
    if (window.innerWidth < TabletScreen) {
      counter.init = initialFilmsMini
      counter.step = addScren
    }
    return counter
  }

  //@ при первой отрисовке
  React.useEffect(() => {
    setCount(renderListFilm().init)
    function monitorsSize() {
      setCount(renderListFilm().init);
    }
    window.addEventListener('resize', monitorsSize);
    return () => window.removeEventListener('resize', monitorsSize);
  }, [movieArr])

  //@ при клике по кнопке еще
  function addFilmList() {
    setCount(count + renderListFilm().step)
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list list">
        {isLoading ? <Preloader /> :
          pathname === '/movies' && fact.length !== 0 ? (
            fact.map((movie) => {
              return (
                <MoviesCard
                  className="movies-card-list__item"
                  dataMovie={movie}
                  key={movie.id || movie.movieId}
                  saveMovie={saveMovie}
                  addMovie={addMovie}
                  deliteMovie={deliteMovie}
                ></MoviesCard>
              );
            })
          ) :
            movieArr && movieArr.length !== 0 ? (
              movieArr.map((movie) => {
                return (
                  <MoviesCard
                    className="movies-card-list__item"
                    dataMovie={movie}
                    key={movie.id || movie.movieId}
                    saveMovie={saveMovie}
                    addMovie={addMovie}
                    deliteMovie={deliteMovie}
                  ></MoviesCard>
                );
              })
            ) : error ? (
              <p>
                Во время запроса произошла ошибка. Возможно, проблема с соединением
                или сервер недоступен. Подождите немного и попробуйте ещё раз
              </p>
            ) : !isSearchEmpty ? (
              <p>Ничего не найдено</p>
            ) : (
              ""
            )}
      </ul>
      {pathname === "/saved-movies" ? (
        <div className="movies-card-list__download-more movies-card-list__download-more_movie-save"></div>
      ) : (
        <div className="movies-card-list__download-more">
          {count >= movieArr.length ? "" : <Button className="button_more" onClick={addFilmList}>Ещё</Button>}
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;


