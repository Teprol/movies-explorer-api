import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// @ ипорт компоненов
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import Preloader from "../Preloader/Preloader";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

import { api } from "../../utils/MainApi";
// контексты
import { ErrorContext } from "../../context/ErrorContext";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function App() {
  // стейт авторизации
  // todo вынести это в контекст чтобы можно было получить в любой части приложение
  // стейт состояния авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);
  // стейт загруки страницы
  const [isCheck, setIsCheck] = React.useState(true);
  // стейт ошибок
  const [error, setError] = React.useState(false);
  // стейт инфы пользователя
  const [user, setUser] = React.useState({});
  // стейт сохраненых фильмов
  const [saveMovie, setSaveMovie] = React.useState([]);
  // стейт успешного прохода запроса редактирования профиля
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  // хук навигации
  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getToken(jwt)
        .then(() => {
          setLoggedIn(true);
          setIsCheck(false);
        })
        .catch((err) => {
          api.getInfoError("Токен не верный", err);
          setError(true);
          localStorage.clear();
          setLoggedIn(false);
          setIsCheck(false);
        });
    }
    if (loggedIn) {
      // кидаем запрос на инфу пользователя и сохр карточки пользователя
      Promise.all([api.getUserInfo(jwt), api.getCardData(jwt)])
        // получаем инфу в ответе
        .then(([userData, savedMovies]) => {
          // сохраняем все в стейты
          setUser(userData);
          setSaveMovie(savedMovies);
        })
        .catch((err) => {
          api.getInfoError("Ошибка загрузки начальных данных", err);
          setError(true);
          localStorage.clear();
          setLoggedIn(false);
          setIsCheck(false);
        });
    }
    if (!jwt) {
      localStorage.clear();
      setLoggedIn(false);
      setIsCheck(false);
    }
  }, [loggedIn]);

  //@ регистрация пользователя
  function handleRegisterUser(userData) {
    api
      .regist(userData)
      .then((res) => {
        api
          .authorization(userData)
          .then((res) => {
            localStorage.setItem("jwt", res.token);
            setLoggedIn(true);
            navigate("/movies");
          })
          .catch((err) => {
            api.getInfoError(
              "Регистрация успешна, авторизация не удалась",
              err
            );
            setError(true);
          });
      })
      .catch((err) => {
        api.getInfoError("Регестрация не прошла", err);
        setError(true);
      });
  }

  //@ авторизация пользователя
  function handleLogin(userData) {
    api
      .authorization(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        api.getInfoError("Авторизация не удалась", err);
        setError(true);
      });
  }

  //@ выход из аккаунта
  function logOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  //@ редактирование профиля пользователя
  function handleEditUser(name, email) {
    const jwt = localStorage.getItem("jwt");
    api
      .setUserInfo(name, email, jwt)
      .then((newInfoUser) => {
        setUser(newInfoUser);
        setIsSuccessful(true);
      })
      .catch((err) => {
        api.getInfoError("Данные не изменены", err);
        setError(true);
        setIsSuccessful(false);
      });
  }

  //@ удаление фильмы из сохраненых
  function handleDeleteMovie(moviId) {
    const jwt = localStorage.getItem("jwt");
    api.deleteMovie(moviId, jwt)
      .then(() => {
        setSaveMovie(saveMovie.filter(movie => { return movie._id !== moviId }))
      })
      .catch((err) => {
        api.getInfoError("Фильм не удален", err);
      })
  }

  //@ сохранения или удаление фильма
  function handleMovieLike(movie) {
    const jwt = localStorage.getItem("jwt");
    // проверка на наличие в сохраненых
    const isMovieInSavedMovies = saveMovie.find((savedMovie) => savedMovie.movieId === movie.id);
    if (isMovieInSavedMovies) {
      handleDeleteMovie(isMovieInSavedMovies._id);
    } else {
      api.saveMovie(movie, jwt)
        .then((res) => {
          setSaveMovie([res, ...saveMovie]);
        })
        .catch((err) => {
          api.getInfoError("возникла ошибка при сохранении фильма", err);
        })
    }
  }

  return (
    <>
      {isCheck ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={user}>
          <ErrorContext.Provider value={{ error, setError }}>
            <div className="page">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Header loggedIn={loggedIn}></Header>
                      <Main></Main>
                      <Footer></Footer>
                    </>
                  }
                ></Route>

                <Route
                  path="/movies"
                  element={
                    <>
                      {/* <Header loggedIn={loggedIn}></Header> */}
                      <ProtectedRoute
                        element={Movies}
                        loggedIn={loggedIn}
                        saveMovie={saveMovie}
                        addMovie={handleMovieLike}
                      ></ProtectedRoute>
                      {/* <Movies loggedIn={loggedIn}></Movies> */}
                      {/* <Footer></Footer> */}
                    </>
                  }
                ></Route>

                <Route
                  path="/saved-movies"
                  element={
                    <>
                      {/* <Header loggedIn={loggedIn}></Header> */}
                      <ProtectedRoute
                        element={SavedMovies}
                        loggedIn={loggedIn}
                        saveMovie={saveMovie}
                        deliteMovie={handleDeleteMovie}
                      ></ProtectedRoute>
                      {/* <SavedMovies loggedIn={loggedIn}></SavedMovies> */}
                      {/* <Footer></Footer> */}
                    </>
                  }
                ></Route>

                <Route
                  path="/profile"
                  element={
                    <>
                      {/* <Header loggedIn={loggedIn}></Header> */}
                      <ProtectedRoute
                        element={Profile}
                        loggedIn={loggedIn}
                        logOut={logOut}
                        editUser={handleEditUser}
                        isSuccessful={isSuccessful}
                        setIsSuccessful={setIsSuccessful}
                      ></ProtectedRoute>
                      {/* <Profile loggedIn={loggedIn}></Profile> */}
                    </>
                  }
                ></Route>

                <Route
                  path="/signin"
                  element={
                    <Login loggedIn={loggedIn} onLogin={handleLogin}></Login>
                  }
                ></Route>

                <Route
                  path="/signup"
                  element={
                    <Register
                      loggedIn={loggedIn}
                      onRegist={handleRegisterUser}
                    ></Register>
                  }
                ></Route>

                <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
              </Routes>
            </div>
          </ErrorContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </>
  );
}

export default App;
