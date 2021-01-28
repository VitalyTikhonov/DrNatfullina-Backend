const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { isObjectIdValid } = require('../helpers');
const { errors } = require('../configs/errorMessages');

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
  validateIdInParams,
};
