const User = require('../models/user.model');
const { NotFoundError, BadRequestError } = require('../errors');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

async function registerUser(name, email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('User already exist');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser._id);
  return {
    user_id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token,
  };
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new BadRequestError('Invalid password');
  }

  const token = generateToken(user._id);
  return { user_id: user._id, name: user.name, email: user.email, token };
}

async function updatePassword(userId, newPassword) {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ _id: userId }, { password: hashedPassword });
}

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
};
