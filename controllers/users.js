const mongoose = require('mongoose');
const User = require('../models/user');
const DocNotFoundError = require('../errors/DocNotFoundError');
const InUseError = require('../errors/InUseError');
const InvalidInputError = require('../errors/InvalidInputError');
const { JWT_COOKIE_NAME } = require('../configs/config');

function findUsers(req, res, next) {
  const criteria = Object.fromEntries(Object.entries(req.body));
  // User.find({ owner: req.user._id })
  User.find(criteria)
    .orFail(new DocNotFoundError('user'))
    .then((respObj) => res.send(respObj))
    .catch(next);
}

function getUserById(req, res, next) {
  return User.findById(req.params.id)
    .orFail(new DocNotFoundError('user'))
    .then((respObj) => {
      res.send(respObj);
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  const userId = req.user._id;
  req.params.id = userId;
  /* идентификатор отправителя запроса (ПОДЧЕРКИВАНИЕ ПЕРЕД id!)
  (проверяется isObjectIdValid в auth) */

  getUserById(req, res, next);
}

function updateUser(req, res, next) {
  try {
    /* const fieldsObj = Object.fromEntries(Object.entries(req.body)); // если весь req.body – но
    в таком случае через данный контроллер можно перезаписать и пароль, и другие системные поля,
    что выглядит опасным, несмотря на то что на фронтенде не будет реализована отправка запросов
    к этому контроллеру с полем пароля */
    const {
      firstName,
      patronymic,
      lastName,
      phone,
      avatar,
      doctorNotes,
    } = req.body;
    User.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        patronymic,
        lastName,
        phone,
        avatar,
        doctorNotes,
      },
      {
        new: true, // will instead give you the object after update was applied
        runValidators: true,
        upsert: false, // !!!!!!!!!!!!!

        /* если omitUndefined: false (по умолчанию), то неопр поля сбрасываются (null).
        Если при этом передаются пустые поля, которые являются в модели обязательными, то
        запрос не выполняется (message: null).
        Можно сделать false, чтобы использовать этот метод для сброса полей, но тогда
        все незаполненные пользователем поля должны подставляться на фронтенде по дефолту
        (а обязательные – в любом случае, впрочем это подразумевается валидацией на фронтенде).
        Это все касается полей, буквально переданных вторым аргументом в findByIdAndUpdate со
        значением undefined. Если поля там (во втором аргументе) просто нет, в базе оно
        не меняется. */
        omitUndefined: false,
      },
    )
      .orFail(new DocNotFoundError('user'))
      .then((respObj) => res.send(respObj))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new InvalidInputError(err));
        } else if (err.code === 11000) {
          // console.log('11000 Object.keys(err.keyValue)[0]', Object.keys(err.keyValue)[0]);
          next(new InUseError(Object.keys(err.keyValue)[0]));
        }
      });
  } catch (err) {
    next(err);
  }
}

function updateCurrentUser(req, res, next) {
  const userId = req.user._id;
  req.params.id = userId;
  updateUser(req, res, next);
}

function deleteUser(req, res, next) {
  try {
    User.findById(req.params.id)
      .orFail(new DocNotFoundError('user'))
      .then((respObj) => {
        respObj.deleteOne().then((deletedObj) => {
          res.clearCookie(JWT_COOKIE_NAME).send({ message: 'Прощайте!' });
          res.send(deletedObj);
        });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
}

function deleteCurrentUser(req, res, next) {
  // console.log('deleteCurrentUser', res.req.cookies);
  const userId = req.user._id;
  req.params.id = userId;
  deleteUser(req, res, next);
}

module.exports = {
  getUserById,
  getCurrentUser,
  findUsers,
  updateUser,
  updateCurrentUser,
  deleteUser,
  deleteCurrentUser,
};
