const { errors } = require('../configs/errorMessages');

class InUseError extends Error {
  constructor(field) {
    super();
    this.statusCode = 409;
    this.message = errors.inUse(field);
  }
}

module.exports = InUseError;
