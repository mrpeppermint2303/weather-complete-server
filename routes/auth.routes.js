const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateUser } = require('../middlewares/auth');
const {
  registerValidator,
  loginValidator,
  updatePassword,
} = require('../middlewares/validators/authValidator');

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.put(
  '/password',
  authenticateUser,
  updatePassword,
  authController.updatePassword
);

module.exports = router;
