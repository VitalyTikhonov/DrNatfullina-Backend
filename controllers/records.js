const mongoose = require('mongoose');
const Record = require('../models/recordSchema');
const User = require('../models/user');

const DocNotFoundError = require('../errors/DocNotFoundError');
const InvalidInputError = require('../errors/InvalidInputError');
// const NoRightsError = require('../errors/NoRightsError');

function findRecords(req, res, next) {
  const criteria = Object.fromEntries(Object.entries(req.body));
  Record.find(criteria)
    .orFail(new DocNotFoundError('record'))
    .then((respObj) => res.send(respObj))
    .catch(next);
}

function getRecord(req, res, next) {
  return Record.findById(req.params.id)
    .orFail(new DocNotFoundError('record'))
    .then((respObj) => {
      res.send(respObj);
    })
    .catch(next);
}

async function createRecord(req, res, next) {
  try {
    const userExists = await User.findById(req.body.patientId).orFail(
      new DocNotFoundError('user'),
    );
    return (
      userExists &&
      Record.create(req.body)
        .then((respObj) => res.send(respObj))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return next(new InvalidInputError(err));
          }
          return next(err);
        })
    );
  } catch (err) {
    return next(err);
  }
}

function updateRecord(req, res, next) {
  try {
    const { date, location, issues, comments } = req.body;
    Record.findByIdAndUpdate(
      req.params.id,
      {
        date,
        location,
        issues,
        comments,
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
      .orFail(new DocNotFoundError('record'))
      .then((respObj) => res.send(respObj))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          return next(new InvalidInputError(err));
        }
        return next(err);
      });
  } catch (err) {
    next(err);
  }
}

function deleteRecord(req, res, next) {
  try {
    Record.findById(req.params.id)
      .orFail(new DocNotFoundError('record'))
      .then((respObj) => {
        respObj.deleteOne().then((deletedObj) => res.send(deletedObj));
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
