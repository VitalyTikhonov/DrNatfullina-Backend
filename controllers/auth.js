const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  JWT_SECRET,
  JWT_EXPIRY_DAYS,
  JWT_COOKIE_NAME,
  AUTH_COOKIE_CONFIG,
} = require('../configs/config');
const InUseError = require('../errors/InUseError');
const InvalidInputError = require('../errors/InvalidInputError');

function createUser(req, res, next) {
  const {
    email,
    password,
    firstName,
    patronymic,
    lastName,
    phone,
    avatar,
  } = req.body;

  const role = 'user';
  const isEmailVerified = false;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        firstName,
        patronymic,
        lastName,
        role,
        isEmailVerified,
        phone,
        avatar,
      })
        .then((respObj) => {
          /* переменная с деструктуризацией const {свойства} = respObj удалена
          для исключения ошибки линтинга */
          const token = jwt.sign( // делаем токен
            { _id: respObj._id },
            // { _id: '5f59fd0c710b20e7857e392' }, // невалидный айди для тестирования
            JWT_SECRET,
            { expiresIn: `${JWT_EXPIRY_DAYS}d` },
          );

          res
            .cookie(JWT_COOKIE_NAME, token, AUTH_COOKIE_CONFIG) // отправляем токен
            .send({
              email: respObj.email,
              firstName: respObj.firstName,
              patronymic: respObj.patronymic,
              lastName: respObj.lastName,
              role: respObj.role,
              isEmailVerified: respObj.isEmailVerified,
              phone: respObj.phone,
              avatar: respObj.avatar,
              _id: respObj._id,
            });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new InvalidInputError(err));
          } else if (err.code === 11000) {
            // console.log('11000 Object.keys(err.keyValue)[0]', Object.keys(err.keyValue)[0]);
            next(new InUseError(Object.keys(err.keyValue)[0]));
          }
        });
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findByCredentials(email, password) // return!
    .then((user) => {
      const token = jwt.sign( // делаем токен
        { _id: user._id },
        // { _id: '5f59fd0c710b20e7857e392' }, // невалидный айди для тестирования
        JWT_SECRET,
        { expiresIn: `${JWT_EXPIRY_DAYS}d` },
      );
      res
        .cookie(JWT_COOKIE_NAME, token, AUTH_COOKIE_CONFIG) // отправляем токен
        .send({ name: user.name });
      // .end();
    })
    .catch(next);
}

function logout(req, res) {
  res
    .clearCookie(JWT_COOKIE_NAME)
    .send({ message: 'До свиданья!' });
  // .end();
}

module.exports = {
  createUser,
  login,
  logout,
};
