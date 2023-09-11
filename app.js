require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { FILMS_DB, PORT } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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
app.use(errorLogger); // подключаем логгер ошибок

app.listen(PORT);
