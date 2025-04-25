// services/adafruitService.js
const mqtt = require('mqtt');
const axios = require('axios');
const { AIO_USERNAME, AIO_KEY, FEED_TEMP, FEED_HUMID, FEED_LIGHT, FEED_SOIL, FEED_LED, FEED_PUMP } = require('../config/adafruit');

const sensorSubject = require('../observable/SensorSubject');
const notifyFEObserver = require('../observer/notifyFEObserver');
const saveToDBObserver = require('../observer/saveToDBObserver');
const autoControlObserver = require('../observer/autoControlObserver');

let io = null;

const setupIO = (ioInstance) => {
  io = ioInstance;
  notifyFEObserver.setIO(ioInstance);
  autoControlObserver.setIO(ioInstance);

  sensorSubject.subscribe(notifyFEObserver);
  sensorSubject.subscribe(saveToDBObserver);
  sensorSubject.subscribe(autoControlObserver);
};

const mqttUrl = `mqtts://${AIO_USERNAME}:${AIO_KEY}@io.adafruit.com`;
const client = mqtt.connect(mqttUrl);

client.on('connect', () => {
  console.log('MQTT đã kết nối Adafruit IO');
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_HUMID}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_LED}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_LIGHT}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_TEMP}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_PUMP}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_SOIL}`);
});

client.on('error', (err) => {
  console.error('Lỗi MQTT:', err.message);
});

client.on('message', async (topic, message) => {
  const value = message.toString();
  const feed = topic.split('/').pop();

  console.log(`[MQTT] Dữ liệu mới từ ${feed}: ${value}`);
  sensorSubject.notify({ feed, value });
});

const sendDataToAdafruit = async (feed, value) => {
  try {
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feed}/data`;

    const response = await axios.post(
      url,
      { value },
      {
        headers: {
          'X-AIO-Key': AIO_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[Adafruit] Gửi ${value} tới ${feed} thành công`);
    return response.data;
  } catch (error) {
    console.error('[Adafruit] Gửi dữ liệu thất bại:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  setupIO,
  client,
  sendDataToAdafruit,
};
