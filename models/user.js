const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  // PIDPermission: {
  // },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  patronymic: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: false,
    unique: true,
    validate: (phone) => validator.isMobilePhone(phone),
  },
  avatar: {
    type: String,
    required: false,
    validate: (link) => validator.isURL(link),
  },
  // recordId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
});

userSchema.statics.findByCredentials = function findByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new InvalidCredentialsError())
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new InvalidCredentialsError());
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
