import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ErrorPage.css"

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <main className="error-page">
      <div className="error-page__container">
        <h2 className="error-page__title">404</h2>
        <p className="error-page__text">Страница не найдена</p>
        <a className="error-page__link link hover" onClick={handleGoBack}>Назад</a>
      </div>
    </main>
  );
};

export default ErrorPage;