require('dotenv').config();
const app = require('./app');
const http = require('http');
const { testConnection } = require('./config/db');
const { getLastValueFromDB } = require('./models/sensorModel');
const { Server } = require('socket.io');
const adafruitController = require('./controllers/adafruitController');
const {  AIO_USERNAME, AIO_KEY, FEED_TEMP, FEED_HUMID, FEED_LIGHT, FEED_SOIL, FEED_LED, FEED_PUMP } = require('./config/adafruit');



const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: { origin: "*" }
});
  
io.on('connection', async (socket) => {
    console.log('FE đã kết nối:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('FE không kết nối:', socket.id);
    });

    const feeds = [FEED_HUMID, FEED_LED, FEED_LIGHT, FEED_TEMP, FEED_PUMP, FEED_SOIL];

  for (const feed of feeds) {
    try {
      // Lấy giá trị cuối cùng từ database hoặc cache
      const value = await getLastValueFromDB(feed);
      socket.emit('new-data', { feed, value });
    } catch (err) {
      console.error(`Không thể lấy giá trị cuối cùng của [${feed}]:`, err.message);
    }
  }
  });

adafruitController.setupIO(io);



server.listen(PORT, async () => {
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`Server chạy ở đại chỉ http://localhost:${PORT}`);
  await testConnection(); 
});