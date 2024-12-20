const userService = require('../services/user.service');
const { handleSuccess } = require('../utils/responseHandlers');

async function update(req, res, next) {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;
    await userService.updateUser(userId, name, email);

    handleSuccess(res, 'User details updated successfully');
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await userService.fetchUserDetails(userId);

    handleSuccess(res, 'User details retrieved successfully', user);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const userId = req.user.id;
    await userService.removeUser(userId);

    handleSuccess(res, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  update,
  get,
  remove,
};
