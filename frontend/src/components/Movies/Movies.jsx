import React from "react";
import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { apiMovi } from "../../utils/MoviesApi";

function Movies({saveMovie, addMovie}) {
  // стейт переменная фильмов с api
  const [movies, setMovies] = React.useState([]);
  // стейт ошибок запроса
  const [error, setError] = React.useState(false);
  // стейт отфильрованных карточек
  const [movieFilter, setMovieFilter] = React.useState([]);
  // стейт объекта запроса поиска
  const [searchData, setSearchData] = React.useState({});
  // стейт следит пустой результат поиска или нет
  const [isSearchEmpty, setIsSearchEmpty] = React.useState(true);
  // стейт загрузки
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem("searchQuery"));
    if (savedSearch) {
      setSearchData(savedSearch);
    }
    const savedFilteredMovies = JSON.parse(
      localStorage.getItem("moviesFiltered")
    );
    if (savedFilteredMovies) {
      setMovieFilter(savedFilteredMovies);
    }
    const movieAll = JSON.parse(localStorage.getItem("movies"));
    if (movieAll) {
      setMovies(movieAll);
    }
  }, []);

  // функция которая фильтрует массив всех фильмов
  function filterMovie({ searchString, isCheckbox }, movies) {
    // запишет фильрованный массив фильмов в стейт переменную
    let searchMovieArr = [];
    searchMovieArr = movies.filter((movie) => {
      const searchName =
        movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchString.toLowerCase());
      return isCheckbox ? searchName && movie.duration <= 40 : searchName;
    });
    setMovieFilter(searchMovieArr);
    // проверям дал ли поиск нам результат
    searchMovieArr.length > 0
      ? setIsSearchEmpty(true)
      : setIsSearchEmpty(false);
    localStorage.setItem("moviesFiltered", JSON.stringify(searchMovieArr));
  }

  //поиск и загрузка фильмов
  function searchMovies(objectSearch) {
    localStorage.setItem("searchQuery", JSON.stringify(objectSearch));
    if (movies.length === 0) {
      //todo  тут нужна загрузка прелодера
      setIsLoading(true);
      apiMovi
        .getMovies()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          setMovies(res);
          filterMovie(objectSearch, res);
        })
        .catch((err) => {
          apiMovi.getInfoError("Ошибка при загрузке фильмов", err);
          setError(true);
        })
        .finally(() => {
          //todo окончание загрузки
          setIsLoading(false);
        });
    } else {
      filterMovie(objectSearch, movies);
    }
  }

  return (
    <main className="movies">
      <SearchForm search={searchMovies} searchData={searchData}></SearchForm>
      <MoviesCardList
        movieArr={movieFilter}
        error={error}
        isSearchEmpty={isSearchEmpty}
        saveMovie={saveMovie}
        addMovie={addMovie}
        isLoading={isLoading}
      ></MoviesCardList>
    </main>
  );
}

export default Movies;
