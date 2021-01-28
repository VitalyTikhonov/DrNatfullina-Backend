const mongoose = require('mongoose');
const Post = require('../models/postSchema');

const DocNotFoundError = require('../errors/DocNotFoundError');
const InvalidInputError = require('../errors/InvalidInputError');
// const NoRightsError = require('../errors/NoRightsError');

function findPosts(req, res, next) {
  const criteria = Object.fromEntries(Object.entries(req.body));
  Post.find(criteria)
    .orFail(new DocNotFoundError('post'))
    .then((respObj) => res.send(respObj))
    .catch(next);
}

function getPost(req, res, next) {
  return Post.findById(req.params.id)
    .orFail(new DocNotFoundError('post'))
    .then((respObj) => {
      res.send(respObj);
    })
    .catch(next);
}

function createPost(req, res, next) {
  try {
    Post.create({
      authorId: req.user._id,
      ...req.body,
      comments: [],
    })
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

function updatePost(req, res, next) {
  try {
    const {
      name,
      text,
      categories,
      coverPhoto,
    } = req.body;
    Post.findByIdAndUpdate(
      req.params.id,
      {
        name,
        text,
        categories,
        coverPhoto,
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
      .orFail(new DocNotFoundError('post'))
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

function deletePost(req, res, next) {
  try {
    Post.findById(req.params.id)
      .orFail(new DocNotFoundError('post'))
      .then((respObj) => {
        respObj.deleteOne().then((deletedObj) => res.send(deletedObj));
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  findPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
