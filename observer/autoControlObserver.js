const { getLimitByDevice } = require('../models/limitModel');
const { FEED_LED, FEED_PUMP } = require('../config/adafruit');
const { sendDataToAdafruit } = require('../services/adafruitService');

let io = null;

const autoControlObserver = {
  setIO(ioInstance) {
    io = ioInstance;
  },

  async update({ feed, value }) {
    const noti = "Đã tiến hành bật thiết bị trong vòng 5s để cố gắng khắc phục";
    let device = null;

    if (feed === 'soil') device = 'soil';
    else if (feed === 'humid') device = 'humid';
    else if (feed === 'light') device = 'light';
    else if (feed === 'temp') device = 'temp';

    if (!device) return;

    const limit = await getLimitByDevice(device);
    if (!limit) return;

    const { limit_up, limit_down } = limit;
    const up = parseFloat(limit_up);
    const down = parseFloat(limit_down);
    const floatValue = parseFloat(value);

    if (floatValue < down) {
      console.log(`[Auto] ${device} < ${down} → BẬT`);

      if (device === 'soil' || device === 'humid') {
        await sendDataToAdafruit(FEED_PUMP, 100);
        io?.emit('notification', { feed, value });
        setTimeout(() => {
          sendDataToAdafruit(FEED_PUMP, 0);
          console.log(`[Auto] TẮT PUMP sau 5s`);
          io?.emit('notification', noti);
        }, 5000);
      }

      if (device === 'light') {
        await sendDataToAdafruit(FEED_LED, 100);
        io?.emit('notification', { feed, value });
        setTimeout(() => {
          sendDataToAdafruit(FEED_LED, 0);
          console.log(`[Auto] TẮT LED sau 5s`);
          io?.emit('notification', noti);
        }, 5000);
      }
    } else if (floatValue > up) {
      console.log(`[Auto] ${device} > ${up} → TẮT`);
      io?.emit('notification', { feed, value });

      if (device === 'soil' || device === 'humid') await sendDataToAdafruit(FEED_PUMP, 0);
      if (device === 'light') await sendDataToAdafruit(FEED_LED, 0);
    }
  },
};

module.exports = autoControlObserver;
