const mqtt = require('mqtt');
const axios = require('axios');
const { insertData } = require('../models/sensorModel');
const {saveLimitModel,getLimitByDevice} = require('../models/limitModel')
const {  AIO_USERNAME, AIO_KEY, FEED_TEMP, FEED_HUMID, FEED_LIGHT, FEED_SOIL, FEED_LED, FEED_PUMP } = require('../config/adafruit');



let io = null;

const setupIO = (ioInstance) => {
  io = ioInstance;
};

const mqttUrl = `mqtts://${AIO_USERNAME}:${AIO_KEY}@io.adafruit.com`;
const client = mqtt.connect(mqttUrl);

client.on('connect', () => {
  console.log('Đã kết nối MQTT đến Adafruit IO');

  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_HUMID}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_LED}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_LIGHT}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_TEMP}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_PUMP}`);
  client.subscribe(`${AIO_USERNAME}/feeds/${FEED_SOIL}`);
  
});

client.on('error', (err) => {
  console.error('Lỗi khi kết nối tới Adafruit IO:', err.message);
});

client.on('message', async (topic, message) => {
    const value = message.toString();
    const feed = topic.split('/').pop();

    console.log(`Dữ liệu mới từ [${feed}]: ${value}`);


  try {
    io.emit('new-data', { feed, value });
    await insertData(feed, value);
    console.log(`Đã lưu dữ liệu vào database`);


    let noti = "Đã tiến hành bật thiết bị trong vòng 5s để cố gắng khắc phục"
    let device = null;
    if (feed == FEED_SOIL) device = 'soil';
    else if (feed == FEED_HUMID) device = 'humid';
    else if (feed == FEED_LIGHT) device = 'light';
    else if (feed == FEED_TEMP) device = 'temp';

    if (device) {
      const limit = await getLimitByDevice(device);
      if (limit) {
        const { limit_up, limit_down } = limit;
        const up = parseFloat(limit_up);
        const down = parseFloat(limit_down);

        if (value < down) {
          console.log(`[Auto] ${device} < ${down} → BẬT thiết bị`);
          if (device === 'soil' || device === 'humid') {
            await sendDataToAdafruit(FEED_PUMP, 100);
            io.emit('notification', { feed, value } );
            setTimeout(() => {
                sendDataToAdafruit(FEED_PUMP, 0);
                console.log(`[Auto] TẮT PUMP sau 5 giây`);
                io.emit('notification', noti );
              }, 5000); 
        }
          if (device === 'light') {
            await sendDataToAdafruit(FEED_LED, 100);
            io.emit('notification', { feed, value } );
            setTimeout(() => {
                sendDataToAdafruit(FEED_LED, 0);
                console.log(`[Auto] TẮT LED sau 5 giây`);
                io.emit('notification', noti );
              }, 5000); 
        }
        } else if (value > up) {
          console.log(`[Auto] ${device} > ${up} → TẮT thiết bị`);
          io.emit('notification', { feed, value } );
          if (device === 'soil' || device === 'humid') await sendDataToAdafruit(FEED_PUMP, 0);
          if (device === 'light') await sendDataToAdafruit(FEED_LED, 0);
        }
      } else {
        console.log(`[Info] Không có limit cho device ${device}`);
      }
    }

  } catch (err) {
    console.error('Lỗi khi gọi insertSensorData:', err.message);
  }
  
});

const sendDataToAdafruit = async (feed, value) => {
    try {
      const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feed}/data`;
      
      const response = await axios.post(
        url,
        { value }, // body
        {
          headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
          }
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
    sendDataToAdafruit
}