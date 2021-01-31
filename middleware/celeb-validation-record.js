const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi, 'test');

const { errors } = require('../configs/errorMessages');

const validateRecord = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        patientId: Joi.objectId().required().messages({
          'string.pattern.name': errors.objectId.patient,
          'any.required': errors.missing.patientId,
          'string.empty': errors.missing.patientId,
        }),
        date: Joi.date().required().messages({
          'date.strict': errors.notDate, // https://joi.dev/api/?v=17.3.0#datestrict https://joi.dev/api/?v=17.3.0#datebase
          'any.required': errors.missing.date,
          'string.empty': errors.missing.date,
        }),
        location: Joi.string()
          .min(2)
          .max(100)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(100),
          }),
        issues: Joi.array()
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
          .messages({ 'any.required': errors.missing.issues }),
        comments: Joi.array()
          .required()
          .items(
            Joi.objectId().messages({
              'string.pattern.name': errors.objectId.comment,
              'string.empty': errors.missing.commentId,
            }),
          )
          .messages({ 'any.required': errors.missing.comments }),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

const validateProvidedRecordData = celebrate(
  {
    body: Joi.object()
      .options({ abortEarly: false })
      .keys({
        patientId: Joi.objectId().messages({
          'string.pattern.name': errors.objectId.patient,
        }),
        date: Joi.date().messages({
          'date.strict': errors.notDate, // https://joi.dev/api/?v=17.3.0#datestrict https://joi.dev/api/?v=17.3.0#datebase
        }),
        location: Joi.string()
          .min(2)
          .max(100)
          .messages({
            'string.base': errors.notString,
            'string.min': errors.tooShort(2),
            'string.max': errors.tooLong(100),
          }),
        issues: Joi.array().items(
          Joi.string()
            .min(2)
            .max(50)
            .messages({
              'string.min': errors.tooShort(2),
              'string.max': errors.tooLong(50),
            }),
        ),
        comments: Joi.array()
          .items(
            Joi.objectId().messages({
              'string.pattern.name': errors.objectId.comment,
            }),
          ),
      }),
  },
  { warnings: true }, // просто чтобы позиционно распознавался следующий аргумент
  { mode: 'full' }, // чтобы валидировались все типы полей (и body, и params и т. п.)
);

module.exports = {
  validateRecord,
  validateProvidedRecordData,
};
