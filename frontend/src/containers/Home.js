import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container'>
        <div class='jumbotron mt-5'>
            <h1 class='display-4'>Вітаю вас на сайті для тестування!</h1>
            <p class='lead'>Тут ви можете  проходити тести!</p>
            <hr class='my-4' />
            <p>Ввійдіть в свій аккант або зареєструйте новий</p>
            <Link class='btn btn-primary btn-lg' to='/login' role='button'>Ввійти</Link>
        </div>
    </div>
);

export default Home;
