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

const getLastValueFromDB = async (feed) => {
  try {
    let table = '';
    let column = '';

    switch (feed) {
      case FEED_TEMP:
        table = 'TEMP';
        column = 'temp';
        break;
      case FEED_HUMID:
        table = 'HUMID';
        column = 'humid';
        break;
      case FEED_LIGHT:
        table = 'LIGHT';
        column = 'light';
        break;
      case FEED_SOIL:
        table = 'SOIL';
        column = 'soil';
        break;
      case FEED_LED:
        table = 'LED';
        column = 'led';
        break;
      case FEED_PUMP:
        table = 'PUMP';
        column = 'pump';
        break;
      default:
        console.warn(`Feed không hợp lệ: ${feed}`);
        return 0;
    }

    const [rows] = await pool.query(
      `SELECT ${column} FROM ${table} ORDER BY timestamp DESC LIMIT 1`
    );

    return rows[0]?.[column] || 0;
  } catch (err) {
    console.error(`Lỗi khi lấy giá trị cuối cùng từ DB cho ${feed}:`, err.message);
    return 0;
  }
};


module.exports = {
  insertData, getLastValueFromDB
};
