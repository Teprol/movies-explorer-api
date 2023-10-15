// Первый файл будет содержать описание запросов к нашему Api
class MainApi {
  constructor() {
    this._baseUrl = "https://api.bobrovdip.nomoredomainsicu.ru";
    // this._authorization = "";
    // this._headers = {
    //   authorization: `Bearer ${localStorage.getItem("token")}`,
    //   "Content-Type": "application/json",
    // };
  }

  //при ошибке выводит в консоль посвеченную надпись об ошибке
  getInfoError = (err, errInf) => {
    console.log(
      `%c${err}`,
      `color: red; font-size: 24px; background-color: black; padding: 3px; text-align: center;`
    );
    console.error(errInf);
  };

  // вывод ошибок в качестве пример api.infoError('текст ошибки', err);
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  };

  //@ регистрация пользователя
  regist = ({ email, password, name }) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email, name }),
    }).then(this._checkResponse);
  };

  //@ авторизация пользователя
  authorization = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  };

  //@ сохраненые фильмы пользователем
  getCardData = (token) => {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //@ сохранение фильма
  saveMovie = (data, token) => {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(this._checkResponse);
  };

  //@ возвращает инфу о пользователе
  getUserInfo = (token) => {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //@ изменяет данные пользователя
  setUserInfo = (name, email, token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  };

  //@ удаление фильма из сохраненых
  deleteMovie = (idCard, token) => {
    return fetch(`${this._baseUrl}/movies/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //@ проверка токена
  getToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    }).then(this._checkResponse);
  };
}

export const api = new MainApi();
