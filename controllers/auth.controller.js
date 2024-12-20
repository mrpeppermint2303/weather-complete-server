const authService = require('../services/auth.service');
const { handleSuccess } = require('../utils/responseHandlers');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    return handleSuccess(res, 'User registered successfully', user);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    return handleSuccess(res, 'User logged in successfully', user);
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req, res, next) {
  try {
    const userId = req.user.id;
    const password = req.body.password;
    await authService.updatePassword(userId, password);
    return handleSuccess(res, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  updatePassword,
};
