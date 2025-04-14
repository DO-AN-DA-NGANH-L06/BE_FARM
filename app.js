const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('./middlewares/middlewware');
const app = express();

app.use(cors());
app.use(express.json());




app.use('/auth', require('./routes/auth'));
app.use(authenticateToken);
app.use('/device', require('./routes/adafruitRoutes'))

module.exports = app;
