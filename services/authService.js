const authModel = require('../models/authModel')
const bcrypt = require('bcrypt');

exports.findUserByUsername = async (username) => {
  const x = authModel.findUserByUsername(username);
  return x;
};

exports.createUser = async (username, hashedPassword) => {
  authModel.createUser(username, hashedPassword)
};

exports.validateUser = async (username, password) => {
  const user = await authModel.validateUser(username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};
