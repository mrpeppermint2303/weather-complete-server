const User = require('../models/user.model');
const { NotFoundError, BadRequestError } = require('../errors');

async function updateUser(userId, name, email) {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id.toString() !== userId) {
    throw new BadRequestError('Email already exist');
  }

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();
  return { user_id: user._id, name: user.name, email: user.email };
}

async function fetchUserDetails(userId) {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return { user_id: user._id, name: user.name, email: user.email };
}

async function removeUser(userId) {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  await user.remove();
}

module.exports = {
  updateUser,
  fetchUserDetails,
  removeUser,
};
