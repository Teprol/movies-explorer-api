import React from "react";
import { Link } from 'react-router-dom';
import "./ButtonProfile.css"

function ButtonProfile({ className }) {
    return (
        <Link to="/profile" className={`link button-profile ${className}`} aria-label="кнопка для входа в профиль">
            <p className="button-profile__text" aria-hidden="true">Аккаунт</p>
            <div className="button-profile__user-icon"></div>
        </Link>
    );
};

export default ButtonProfile;