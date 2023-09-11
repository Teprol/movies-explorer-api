const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'some-secret-key';
const FILMS_DB = process.env.DB_URL ? process.env.DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = process.env.PORT ? process.env.PORT : 3000;

module.exports = {
  SECRET_KEY,
  FILMS_DB,
  PORT,
};
