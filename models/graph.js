const { pool } = require('../config/db');

const getGraphData = async () => {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(now.getDate() - 30);

  const [tempData] = await pool.query(
    `SELECT timestamp, temp AS value FROM TEMP WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [lastMonth, now]
  );

  const [humidData] = await pool.query(
    `SELECT timestamp, humid AS value FROM HUMID WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [lastMonth, now]
  );

  const [lightData] = await pool.query(
    `SELECT timestamp, light AS value FROM LIGHT WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [lastMonth, now]
  );

  const [soilData] = await pool.query(
    `SELECT timestamp, soil AS value FROM SOIL WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [lastMonth, now]
  );

  const [ledData] = await pool.query(
    `SELECT timestamp, led AS value FROM LED WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [lastMonth, now]
  );

  const [pumpData] = await pool.query(
    `SELECT timestamp, pump AS value FROM PUMP WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [lastMonth, now]
  );

  return { temp: tempData, humid: humidData, light: lightData, soil: soilData , led: ledData, pump: pumpData};
};

module.exports = { getGraphData };
