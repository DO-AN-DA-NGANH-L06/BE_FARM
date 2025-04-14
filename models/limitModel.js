const { pool } = require('../config/db');

const saveLimitModel = async (device, limit_up, limit_down) => {
  const now = new Date();
  await pool.query(
    'INSERT INTO LIMITED (device, limit_up, limit_down, time) VALUES (?, ?, ?, ?)',
    [device, limit_up, limit_down, now]
  );
};

const getLimitByDevice = async (device) => {
    const [rows] = await pool.query(
        'SELECT limit_up, limit_down FROM LIMITED WHERE device = ? ORDER BY time DESC LIMIT 1',
        [device]
      );
      return rows.length > 0 ? rows[0] : null;
}

module.exports = { saveLimitModel, getLimitByDevice };