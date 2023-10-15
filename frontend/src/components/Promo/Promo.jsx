import React from 'react';
import { HashLink } from 'react-router-hash-link'
import './Promo.css';

import image from '../../images/promo-iamge.svg'


function Promo() {
    return (
        <section className='promo'>
            <div className='promo__container-content'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <HashLink smooth to="#about-project" className="promo__link link hover">Узнать больше</HashLink>
            </div>
            <div className='promo__container-image'>
                <img src={image} className="promo__image image" alt="планета Земля из слов web" />
            </div>
        </section>
    );
};

export default Promo;