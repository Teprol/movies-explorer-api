import React from "react";
import "./SearchForm.css";

import Button from "../Button/Button";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormsValidation from "../../hoocks/useFormsValidation.js";

import { ErrorContext } from "../../context/ErrorContext";

function SearchForm({ search, searchData }) {
  // контекст ошибки
  const { error, setError } = React.useContext(ErrorContext);
  // хук на упр компонент
  const { resetError } = useFormsValidation();
  // текст поиска
  const [searchString, setSearchString] = React.useState("");
  // состояние чекбокса
  const [isCheckbox, setCheckbox] = React.useState(
    searchData.isCheckbox || false
  );

  React.useEffect(() => {
    if (searchData.searchString) {
      setSearchString(searchData.searchString);
    }
    setCheckbox(searchData.isCheckbox || false);
    setError(false);
  }, [searchData]);

  // получение и запись значений в стейт
  function handleInputChange(e) {
    // скидывает ошибку при вводе значения
    resetError();
    setSearchString(e.target.value);
  }

  // отправка запроса на поиск
  function onSubmit(e) {
    e.preventDefault();
    // если не заполнен поиск будет ошибка
    if (searchString) {
      // в поиск прокинуть объект с состояним чекбокса и текстом запроса
      search({ searchString, isCheckbox });
      setError(false);
    } else {
      setError(true);
    }
  }

  function changeCheckbox() {
    //если строка поиска пустая то чекбокс не поменяется и вылезет ошибка
    if (searchString) {
      setCheckbox(!isCheckbox);
      search({
        searchString: searchString,
        isCheckbox: !isCheckbox,
      });
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <section className="search-form">
      <form
        action="#"
        method="get"
        className="search-form__form"
        name="get-movie"
        noValidate
        onSubmit={onSubmit}
      >
        <fieldset className="search-form__fieldset-search">
          <div className="search-form__container-search">
            <input
              type="search"
              className="search-form__search hover"
              placeholder="Фильм"
              name="search"
              value={searchString}
              onChange={handleInputChange}
            ></input>
            <Button className="search-form__submit button_search" type="submit">
              Поиск
            </Button>
          </div>
          <p className="search-form__errors">{error ? "Введите запрос" : ""}</p>
          <div className="search-form__container-checkbox">
            <FilterCheckbox
              checked={isCheckbox}
              onCheck={changeCheckbox}
            ></FilterCheckbox>
            <p className="search-form__checkbox-text">Короткометражки</p>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
