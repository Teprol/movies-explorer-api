import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './HeaderNav.css';

import ButtonProfile from "../ButtonProfile/ButtonProfile";

function HeaderNav({ loggedIn }) {
    const [burgerActive, setBurgerActive] = React.useState(false);

    //
    function handleBurgerMenu() {
        setBurgerActive(!burgerActive);
    };

    //вешает слушатель на изминение экрана, если больше 1023 то закрывает бургер
    React.useEffect(() => {
        window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth > 1023) {
                setBurgerActive(false);
            }
        });
    }, []);

    return (
        <nav className="header-nav">
            <ul className={`header-nav__list list ${!loggedIn ? "header-nav__list_noAuth" : ""}`}>
                {loggedIn ?
                    <>
                        <li className="header-nav__item">
                            <NavLink to="/movies" className={({ isActive }) => `${isActive ? "header-nav__link_active" : ""} link hover header-nav__link`}>Фильмы</NavLink>
                        </li>
                        <li className="header-nav__item">
                            <NavLink to="/saved-movies" className={({ isActive }) => `${isActive ? "header-nav__link_active" : ""} link hover header-nav__link`}>Сохранённые фильмы</NavLink>
                        </li>
                        <li className="header-nav__item">
                            <ButtonProfile className="header-nav__button-profile hover header-nav__link"></ButtonProfile>
                        </li>
                        <li className="header-nav__item header-nav__item_burger-menu">
                            <button className="header-nav__button-burger button hover" type='button' aria-label="кнопка для входа в профиль" onClick={handleBurgerMenu}></button>
                        </li>
                    </>
                    :
                    <>
                        <li className="header-nav__item">
                            <Link to="/signup" className="header-nav__link link hover">Регистрация</Link>
                        </li>
                        <li className="header-nav__item">
                            <Link to="/signin" className="link header-nav__link-login hover">Войти</Link>
                        </li>
                    </>
                }
            </ul>
            {loggedIn &&
                <>
                    <section className={`burger-menu header-nav__burger-section ${burgerActive ? "burger-menu_active" : ""}`} aria-label="навигация для мобильных приложений">
                        <div className={`burger-menu__container ${burgerActive ? "burger-menu__container_active" : ""}`}>
                            <ul className="burger-menu__nav list">
                                <li className="burger-menu__nav-item">
                                    <NavLink to="/" className={({ isActive }) => `${isActive ? "burger-menu__link_active" : ""} burger-menu__link link hover`}>Главная</NavLink>
                                </li>
                                <li className="burger-menu__nav-item">
                                    <NavLink to="/movies" className={({ isActive }) => `${isActive ? "burger-menu__link_active" : ""} burger-menu__link link hover`}>Фильмы</NavLink>
                                </li>
                                <li className="burger-menu__nav-item">
                                    <NavLink to="/saved-movies" className={({ isActive }) => `${isActive ? "burger-menu__link_active" : ""} burger-menu__link link hover`}>Сохранённые фильмы</NavLink>
                                </li>
                            </ul>
                            <div>
                                <ButtonProfile className="hover"></ButtonProfile>
                            </div>
                            <button type="button" className="burger-menu__button-close button hover" aria-label="закрыть меню" onClick={handleBurgerMenu}></button>
                        </div>
                    </section>
                </>
            }
        </nav>
    );
};

export default HeaderNav;