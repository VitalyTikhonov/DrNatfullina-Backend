const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { errors } = require('../configs/errorMessages');

const validateSignup = celebrate(
  {
    /* abortEarly – чтобы валидировались все поля одного типа (например, все в body) */
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        email: Joi.string().email().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.email,
          'string.empty': errors.missing.email,
          'string.email': errors.badEmail,
        }),
        password: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.password,
          'string.empty': errors.missing.password,
        }),
        firstName: Joi.string()
          .required()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.firstName,
            'string.empty': errors.missing.firstName,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        patronymic: Joi.string()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        lastName: Joi.string()
          .required()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.lastName,
            'string.empty': errors.missing.lastName,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        role: Joi.string()
          // .required()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.role,
            'string.empty': errors.missing.role,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        isEmailVerified: Joi.boolean()
          // .required()
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.isEmailVerified,
            'string.empty': errors.missing.isEmailVerified,
          }),
        phone: Joi.string()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        avatar: Joi.string().messages({
          'string.base': errors.notString,
        }),
        doctorNotes: Joi.string()
          .min(1)
          .max(5000)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(1),
            'string.max': errors.tooLong(5000),
          }),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validateSignin = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        email: Joi.string().email().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.email,
          'string.empty': errors.missing.email,
          'string.email': errors.badEmail,
        }),
        password: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.password,
          'string.empty': errors.missing.password,
        }),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validateProvidedUserData = celebrate(
  {
    /* abortEarly – чтобы валидировались все поля одного типа (например, все в body) */
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        email: Joi.string().email().messages({
          'string.base': errors.notString,
          'string.email': errors.badEmail,
        }),
        password: Joi.string().messages({
          'string.base': errors.notString,
        }),
        firstName: Joi.string()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        patronymic: Joi.string()
          .min(2)
          .max(30)
          .empty('')
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        lastName: Joi.string()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        phone: Joi.string()
          .min(2)
          .max(30)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(30),
          }),
        avatar: Joi.string().messages({
          'string.base': errors.notString,
        }),
        doctorNotes: Joi.string()
          .min(1)
          .max(5000)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(1),
            'string.max': errors.tooLong(5000),
          }),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

module.exports = {
  validateSignup,
  validateSignin,
  validateProvidedUserData,
};
