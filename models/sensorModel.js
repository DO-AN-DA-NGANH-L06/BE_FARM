const { pool } = require('../config/db');
const { FEED_TEMP, FEED_HUMID, FEED_LIGHT, FEED_SOIL, FEED_LED, FEED_PUMP } = require('../config/adafruit');

const insertData = async (feed, value) => {
  try {
    switch (feed) {
      case FEED_TEMP:
        await pool.query('INSERT INTO TEMP (temp) VALUES (?)', [value]);
        break;
      case FEED_HUMID:
        await pool.query('INSERT INTO HUMID (humid) VALUES (?)', [value]);
        break;
      case FEED_LIGHT:
        await pool.query('INSERT INTO LIGHT (light) VALUES (?)', [value]);
        break;
      case FEED_SOIL:
        await pool.query('INSERT INTO SOIL (soil) VALUES (?)', [value]);
        break;
      case FEED_LED:
        await pool.query('INSERT INTO LED (led) VALUES (?)', [value]);
        break;
      case FEED_PUMP:
        await pool.query('INSERT INTO PUMP (pump) VALUES (?)', [value]);
        break;
      default:
        console.warn(`Feed không hợp lệ: ${feed}`);
        break;
    }
  } catch (error) {
    console.error(`Lỗi khi insert dữ liệu cho feed ${feed}:`, error.message);
  }
};

module.exports = {
  insertData
};
