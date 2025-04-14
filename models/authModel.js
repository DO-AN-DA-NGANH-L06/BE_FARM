const {pool} = require('../config/db');

exports.findUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

exports.createUser = async (username, hashedPassword) => {
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
};

exports.validateUser = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0]
};
