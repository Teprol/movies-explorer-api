import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Form.css";

import Button from "../Button/Button";

import { ErrorContext } from "../../context/ErrorContext";

function Form({
  name,
  children,
  className,
  valid,
  onSubmit,
  logOut,
  isSuccessful,
  setIsSuccessful,
  isInputChanged,
}) {
  const [isProfileEdit, setProfileEdit] = React.useState(false);
  const { error, setError } = React.useContext(ErrorContext);
  const { pathname } = useLocation();

  // скидываание ошибок
  React.useEffect(() => {
    setProfileEdit(false);
    setError(false);
  }, [setError, setProfileEdit]);

  // скидывание уведомлений
  React.useEffect(() => {
    if (pathname === "/profile") {
      setProfileEdit(false);
      setIsSuccessful(false);
    }
  }, [setIsSuccessful, pathname, setProfileEdit]);

  // скидывание кнопки сохранить при успешных измениний профиля
  React.useEffect(() => {
    setProfileEdit(false);
  }, [isSuccessful]);

  // открытие профиля
  function profileEdit() {
    setProfileEdit(true);
  }

  return (
    <form
      className={`form ${className}`}
      action="#"
      noValidate
      method="POST"
      name={name}
      onSubmit={onSubmit}
    >
      <fieldset className="form__fieldset">{children}</fieldset>
      <div className="form__container-button">
        {name === "profile" ? (
          <>
            {isProfileEdit ? (
              <>
                <Button
                  className={`form__button button_submit ${
                    valid && isInputChanged ? "" : "button_disabled"
                  }`}
                  type="submit"
                  disabled={!valid || !isInputChanged}
                >
                  Сохранить
                </Button>
              </>
            ) : (
              <>
                <p
                  className={`form__submit-error ${
                    isSuccessful && "form__submit-good"
                  }`}
                >
                  {isSuccessful ? "Ваши данные изменены" : error ? "При регистрации пользователя произошла ошибка." : ""}
                </p>
                <Button
                  className="form__button button_profile-edit"
                  type="button"
                  onClick={profileEdit}
                >
                  Редактировать
                </Button>
                <Link
                  className="form__link form__link_profile link hover"
                  to="/"
                  onClick={logOut}
                >
                  Выйти из аккаунта
                </Link>
              </>
            )}
          </>
        ) : (
          ""
        )}
        {name === "registration" ? (
          <>
            <p className="form__submit-error">
              {error ? "При регистрации пользователя произошла ошибка." : ""}
            </p>
            <Button
              className={`form__button button_submit ${
                valid && !error ? "" : "button_disabled"
              }`}
              type="submit"
              disabled={!valid && error}
            >
              Зарегистрироваться
            </Button>
            <p className="form__text">
              Уже зарегистрированы?{" "}
              <Link className="form__link link hover" to="/signin">
                Войти
              </Link>
            </p>
          </>
        ) : (
          ""
        )}
        {name === "login" ? (
          <>
            <p className="form__submit-error">
              {error ? "Вы ввели неправильный логин или пароль." : ""}
            </p>
            <Button
              className={`form__button button_submit ${
                valid && !error ? "" : "button_disabled"
              }`}
              type="submit"
              disabled={!valid && error}
            >
              Войти
            </Button>
            <p className="form__text">
              Ещё не зарегистрированы?{" "}
              <Link className="form__link link hover" to="/signup">
                Регистрация
              </Link>
            </p>
          </>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default Form;
