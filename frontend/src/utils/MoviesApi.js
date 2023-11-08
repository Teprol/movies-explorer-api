//@ к сервису beatfilm-movies
class MoviesApi {
  constructor() {
    this._baseUrl = "https://api.nomoreparties.co/beatfilm-movies";
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

  getMovies = () => {
    return fetch(`${this._baseUrl}`)
    .then(this._checkResponse);
  };
}

export const apiMovi = new MoviesApi();
