import React from 'react';
import './AboutMe.css';

import Subtitle from '../Subtitle/Subtitle';
import { Link } from 'react-router-dom';
import foto from '../../images/foto.jpg';

function AboutMe() {
    return (
        <section className="about-me">
            <Subtitle className="about-me__title">Студент</Subtitle>
            <div className='about-me__content'>
                <div className='about-me__content-container'>
                    <h3 className='about-me__name-student'>Сергей</h3>
                    <p className='about-me__briefly'>Фронтенд-разработчик, 26 лет</p>
                    <p className='about-me__text'>Я родился и живу в Тольятти, закончил Тольяттинский государственный университет ИМФИТ. В данный момент изучаю фронтенд разработку</p>
                    <a href="https://github.com/Teprol?tab=repositories" className='about-me__link-git link hover' target="_blank" rel="noreferrer">Github</a>
                </div>
                <div className='about-me__foto-container'>
                    <img src={foto} className="image about-me__image" alt="Сергей сутдент фронтенд разработчик" />
                </div>
            </div>
        </section>
    );
};

export default AboutMe;