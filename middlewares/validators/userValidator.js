const { checkSchema } = require('express-validator');
const validate = require('./validate');

const updateUserValidator = async (req, res, next) => {
  await checkSchema({
    name: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'Name must be a string',
      },
    },
    email: {
      in: ['body'],
      optional: true,
      isEmail: {
        errorMessage: 'Invalid email',
      },
    },
  }).run(req);

  validate(req, res, next);
};

module.exports = {
  updateUserValidator,
};