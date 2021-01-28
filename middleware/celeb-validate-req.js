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

const validatePost = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        // не должно быть required, так как подставляется после приема запроса:
        authorId: Joi.objectId().messages({
          'any.required': errors.missing.authorId,
        }),
        name: Joi.string()
          .required()
          .min(2)
          .max(300)
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.name,
            'string.empty': errors.missing.name,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(300),
          }),
        text: Joi.string()
          .required()
          .min(2)
          .max(20000)
          .messages({
            'string.base': errors.notString,
            'any.required': errors.missing.text,
            'string.empty': errors.missing.text,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(20000),
          }),
        categories: Joi.array().items(
          Joi.string()
            .min(2)
            .max(30)
            .messages({
              'string.min': errors.tooShort(2),
              'string.max': errors.tooLong(30),
            }),
        ),
        coverPhoto: Joi.string()
          .messages({
            'string.base': errors.notString,
          })
          .custom((value, helpers) => {
            if (urlValidatorCheck(value)) {
              return value;
            }
            return helpers.message(errors.badUrl.urlToImage);
          }),
        comments: Joi.array().items(
          Joi.string()
            .min(2)
            .max(5000)
            .messages({
              'string.min': errors.tooShort(2),
              'string.max': errors.tooLong(5000),
            }),
        ),
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
  validatePost,
  validateIdInParams,
};
