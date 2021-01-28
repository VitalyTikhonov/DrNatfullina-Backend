const mongoose = require('mongoose');
const Post = require('../models/postSchema');

const NoDocsError = require('../errors/NoDocsError');
const DocNotFoundError = require('../errors/DocNotFoundError');
const InvalidInputError = require('../errors/InvalidInputError');
const NoRightsError = require('../errors/NoRightsError');

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

module.exports = {
  findPosts,
  getPost,
  createPost,
};
