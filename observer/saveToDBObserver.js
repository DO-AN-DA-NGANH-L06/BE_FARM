const { insertData } = require('../models/sensorModel');

const saveToDBObserver = {
  async update({ feed, value }) {
    try {
      await insertData(feed, value);
      console.log(`[DB] Đã lưu ${feed}: ${value}`);
    } catch (err) {
      console.error('[DB] Lỗi lưu:', err.message);
    }
  },
};

module.exports = saveToDBObserver;