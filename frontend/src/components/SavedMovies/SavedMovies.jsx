import React from "react";
import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ loggedIn, saveMovie, deliteMovie }) {
  // стейт ошибок запроса
  const [error, setError] = React.useState(false);
  // стейт отфильрованных карточек
  const [movieFilter, setMovieFilter] = React.useState(saveMovie);
  // стейт объекта запроса поиска
  const [searchData, setSearchData] = React.useState({});
  // стейт следит пустой результат поиска или нет
  const [isSearchEmpty, setIsSearchEmpty] = React.useState(true);

  React.useEffect(() => {
    // если запрос есть рисуем по фильтру
    if (searchData.searchString) {
      filterMovie(searchData, saveMovie);
    } else {
      // если запроса нет, рисуем все сохр
      setMovieFilter(saveMovie);
    }
  }, [saveMovie]);

  // функция которая фильтрует массив всех фильмов
  function filterMovie({ searchString, isCheckbox }, movies) {
    // запишет фильрованный массив фильмов в стейт переменную
    let searchMovieArr = movies;
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
  }

  function searchMovies(objectSearch) {
    // todo начало загрузки
    setSearchData(objectSearch);
    filterMovie(objectSearch, saveMovie);
    //todo конец загрузки
  }

  return (
    <main className="movies">
      <SearchForm search={searchMovies} searchData={searchData}></SearchForm>
      <MoviesCardList movieArr={movieFilter} saveMovie={saveMovie} deliteMovie={deliteMovie} error={error} isSearchEmpty={isSearchEmpty}></MoviesCardList>
    </main>
  );
}

export default SavedMovies;
