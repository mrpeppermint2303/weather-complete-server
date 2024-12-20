const { checkSchema } = require('express-validator');
const validate = require('./validate');

const loginValidator = async (req, res, next) => {
  await checkSchema({
    email: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Email is required',
      isEmail: {
        errorMessage: 'Invalid email',
      },
    },
    password: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Password is required',
      isLength: {
        errorMessage: 'Password must be at least 8 characters long',
        options: { min: 8 },
      },
    },
  }).run(req);

  validate(req, res, next);
};

const registerValidator = async (req, res, next) => {
  await checkSchema({
    name: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Name is required',
      isString: {
        errorMessage: 'Name must be a string',
      },
    },
    email: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Email is required',
      isEmail: {
        errorMessage: 'Invalid email',
      },
    },
    password: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Password is required',
      isLength: {
        errorMessage: 'Password must be at least 8 characters long',
        options: { min: 8 },
      },
    },
  }).run(req);

  validate(req, res, next);
};

const updatePassword = async (req, res, next) => {
  await checkSchema({
    password: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Password is required',
      isLength: {
        errorMessage: 'Password must be at least 8 characters long',
        options: { min: 8 },
      },
    },
  }).run(req);

  validate(req, res, next);
};

module.exports = {
  loginValidator,
  registerValidator,
  updatePassword,
};
