const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { urlValidatorCheck } = require('../helpers');
const { errors } = require('../configs/errorMessages');

const validatePost = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        // не должно быть required, так как подставляется после приема запроса:
        authorId: Joi.objectId().required().messages({
          'string.pattern.name': errors.objectId.author,
          'any.required': errors.missing.authorId,
          'string.empty': errors.missing.authorId,
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
        categories: Joi.array()
          .required()
          .items(
            Joi.string()
              .min(2)
              .max(50)
              .messages({
                'string.min': errors.tooShort(2),
                'string.max': errors.tooLong(50),
              }),
          )
          .messages({ 'any.required': errors.missing.categories }),
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
        comments: Joi.array()
          .required()
          .items(
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

const validateProvidedPostData = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        name: Joi.string()
          .min(2)
          .max(300)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(300),
          }),
        text: Joi.string()
          .min(2)
          .max(20000)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(20000),
          }),
        categories: Joi.array().items(
          Joi.string()
            .min(2)
            .max(50)
            .messages({
              'string.min': errors.tooShort(2),
              'string.max': errors.tooLong(50),
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

module.exports = {
  validatePost,
  validateProvidedPostData,
};
