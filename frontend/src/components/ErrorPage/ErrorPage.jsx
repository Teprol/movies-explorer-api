import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "./ErrorPage.css"

function ErrorPage() {
    return (
        <main className="error-page">
            <div className="error-page__container">
                <h2 className="error-page__title">404</h2>
                <p className="error-page__text">Страница не найдена</p>
                <Link className="error-page__link link hover" to="/">Назад</Link>
            </div>
        </main>
    );
};

export default ErrorPage;