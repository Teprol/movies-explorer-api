import React from 'react';
import './Portfolio.css';

import Subtitle from '../Subtitle/Subtitle';

function Portfolio() {
    return (
        <section className='portfolio'>
            <Subtitle className="portfolio__title subtitle_portfolio">Портфолио</Subtitle>
            <ul className='portfolio__list list'>
                <li className='portfolio__item'>
                    <a href='https://teprol.github.io/how-to-learn/' className='link hover portfolio__link' target="_blank" rel="noreferrer">
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <div className='portfolio__link-icon'></div>
                    </a>
                </li>
                <li className='portfolio__item'>
                    <a href='https://teprol.github.io/russian-travel/' className='link hover portfolio__link' target="_blank" rel="noreferrer">
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <div className='portfolio__link-icon'></div>
                    </a>
                </li>
                <li className='portfolio__item'>
                    <a href='https://github.com/Teprol/react-mesto-auth' className='link hover portfolio__link' target="_blank" rel="noreferrer">
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <div className='portfolio__link-icon'></div>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;