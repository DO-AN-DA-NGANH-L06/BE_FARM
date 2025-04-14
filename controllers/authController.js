const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authService = require('../services/authService');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Thiếu username hoặc password' });

  try {
    const existingUser = await authService.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'username đã có rồi' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await authService.createUser(username, hashedPassword);

    return res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    console.error('Đăng ký lỗi:', err);
    res.status(500).json({ message: 'Lỗi trong server' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.validateUser(username, password);
    if (!user) {
      return res.status(401).json({ message: 'Không khớp' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Đăng nhập lỗi:', err);
    res.status(500).json({ message: 'Lỗi trong server' });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Đăng xuất' });
};
