const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticateUser } = require('../middlewares/auth');
const { updateUserValidator } = require('../middlewares/validators/userValidator');

const router = express.Router();

router.use(authenticateUser);

router.put('/info', updateUserValidator, userController.update);
router.get('/info', userController.get);
router.delete('/', userController.remove);

module.exports = router;
