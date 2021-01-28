const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { isObjectIdValid, urlValidatorCheck } = require('../helpers');
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
            'any.required': errors.missing.name,
            'string.empty': errors.missing.name,
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
        avatar: Joi.string()
          .messages({
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

const validateNonstrictUserDataSet = celebrate(
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
        avatar: Joi.string()
          .messages({
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

const validatePostArticle = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        keyword: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.keyword,
          'string.empty': errors.missing.keyword,
        }),
        title: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.title,
          'string.empty': errors.missing.title,
        }),
        text: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.text,
          'string.empty': errors.missing.text,
        }),
        date: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.date,
          'string.empty': errors.missing.date,
        }),
        source: Joi.string().required().messages({
          'string.base': errors.notString,
          'any.required': errors.missing.source,
          'string.empty': errors.missing.source,
        }),
        link: Joi.string()
          .required()
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.link,
            'string.empty': errors.missing.link,
          })
          .custom((value, helpers) => {
            if (urlValidatorCheck(value)) {
              return value;
            }
            return helpers.message(errors.badUrl.link);
          }),
        urlToImage: Joi.string()
          .required()
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.urlToImage,
            'string.empty': errors.missing.urlToImage,
          })
          .custom((value, helpers) => {
            if (urlValidatorCheck(value)) {
              return value;
            }
            return helpers.message(errors.badUrl.urlToImage);
          }),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validateIdInParams = celebrate(
  {
    params: Joi.object()
      .options({ abortEarly: false })
      .keys({
        id: Joi.custom((id, helpers) => {
          if (isObjectIdValid(id)) {
            return id;
          }
          return helpers.message(errors.objectId.general);
        }),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  // { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

module.exports = {
  validateSignup,
  validateSignin,
  validateNonstrictUserDataSet,
  validatePostArticle,
  validateIdInParams,
};
