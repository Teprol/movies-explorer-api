require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { FILMS_DB, PORT } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errors } = require('celebrate');
const errHandller = require('./middlewares/errHandller');
const router = require('./routes/index');

// const { PORT = 3000, FILMS_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// подключение бд монгуста
mongoose.connect(FILMS_DB, {
  useNewUrlParser: true,
});

const app = express();
app.use(cors()); // корс защита
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter); // лимитер
app.use(helmet());
app.use(express.json());
app.use('/', router); // роуты
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // ошибки валидации
app.use(errHandller); // обработчик ошибок
app.listen(PORT);
