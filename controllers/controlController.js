// controllers/controlController.js
const {   FEED_LED,FEED_PUMP } = require('../config/adafruit');
const { sendDataToAdafruit } = require('./adafruitController'); 
const {saveLimit} = require('../services/adafruitService')
const {getGraphData} = require('../models/graph')

const controlDevice = async (req, res) => {
  const { device, level } = req.body;

  if (!['led', 'pump'].includes(device)) {
    return res.status(400).json({ message: 'Thiết bị không hợp lệ' });
  }

  if (isNaN(level) || level < 0 || level > 100) {
    return res.status(400).json({ message: 'Level phải từ 0 đến 100' });
  }

  const feed = device === 'led' ? FEED_LED : FEED_PUMP;

  await sendDataToAdafruit(feed, level);

  return res.json({ message: `Đã gửi mức ${level}% đến ${device}` });
};

const limitOfDevice = async (req, res) => {
    const { device, limit_up, limit_down } = req.body;
    if (!device || limit_up === undefined || limit_down === undefined) {
        return res.status(400).json({ error: 'Thiếu thông tin' });
      }
    
      try {
        await saveLimit(device, limit_up, limit_down);
        return res.json({ message: `Đã lưu giới hạn cho ${device}` });
      } catch (error) {
        console.error('Lỗi lưu limit:', error);
        return res.status(500).json({ error: 'Lỗi server' });
      }
}


const graphDevice = async (req, res) => {
    try {
      const data = await getGraphData();
      res.json(data);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu biểu đồ:', error.message);
      res.status(500).json({ message: 'Lỗi server khi truy vấn dữ liệu' });
    }
  };


module.exports = { controlDevice, limitOfDevice, graphDevice };
