import React from 'react';
import './AboutProject.css';

import Subtitle from '../Subtitle/Subtitle';

function AboutProject() {
    return (
        <section className='about-project' id="about-project">
            <Subtitle className="about-project__title">О проекте</Subtitle>
            <ul className='stages list about-project__stages' aria-label='описание дипломного проекта'>
                <li className='stages__item'>
                    <h3 className='stages__title'>Дипломный проект включал 5 этапов</h3>
                    <p className='stages__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className='stages__item'>
                    <h3 className='stages__title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='stages__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className='chart list' aria-label='график показывающий этапы визуально'>
                <li className='chart__item chart__item_bekend'>
                    <p className='chart__time chart__time_bekend'>1 неделя</p>
                    <p className='chart__sage'>Back-end</p>
                </li>
                <li className='chart__item'>
                    <p className='chart__time'>4 недели</p>
                    <p className='chart__sage'>Front-end</p>
                </li>
            </ul>
        </section>
    );
};

export default AboutProject;