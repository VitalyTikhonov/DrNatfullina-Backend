require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3002,
  BASE_PATH = '/',
  JWT_SECRET_PROD,
  JWT_EXPIRY_DAYS = 7,
  DATABASE_ADDRESS = 'mongodb://localhost:27017/dr-natfullina',
  JWT_COOKIE_NAME = 'dr-natfullina-jwt',
} = process.env;

const JWT_SECRET_DEV = '078ffdfaf42680c392bc584404455d3c0baaa5bcd54499096f039aa823c6d0bf';
const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET_DEV;
const CORS_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'https://vitalytikhonov.github.io',
  'https://vitaliytikhonov.ru',
  'http://vitaliytikhonov.ru',
];

const AUTH_COOKIE_CONFIG = {
  maxAge: 3600000 * 24 * JWT_EXPIRY_DAYS,
  httpOnly: true,
  sameSite: true,
  secure: NODE_ENV === 'production',
};

module.exports = {
  NODE_ENV,
  PORT,
  BASE_PATH,
  DATABASE_ADDRESS,
  JWT_SECRET,
  JWT_EXPIRY_DAYS,
  JWT_COOKIE_NAME,
  CORS_ORIGINS,
  AUTH_COOKIE_CONFIG,
};
