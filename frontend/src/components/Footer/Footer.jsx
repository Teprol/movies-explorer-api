import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copirate">© 2023</p>
                <ul className="footer__links list">
                    <li className="footer__links-item">
                        <a href="https://practicum.yandex.ru/" className="footer__link link hover" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__links-item">
                        <a href="https://github.com/" className="footer__link link hover" target="_blank" rel="noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;