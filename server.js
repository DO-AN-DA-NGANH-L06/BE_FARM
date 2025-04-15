require('dotenv').config();
const app = require('./app');
const http = require('http');
const { testConnection } = require('./config/db');
const { Server } = require('socket.io');
const adafruitController = require('./controllers/adafruitController');



const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: { origin: "*" }
});
  
io.on('connection', (socket) => {
    console.log('FE đã kết nối:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('FE không kết nối:', socket.id);
    });
  });

adafruitController.setupIO(io);



server.listen(PORT, async () => {
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`Server chạy ở đại chỉ http://localhost:${PORT}`);
  await testConnection(); 
});