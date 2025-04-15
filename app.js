const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOption');
const cors = require('cors');
const { authenticateToken } = require('./middlewares/middlewware');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use('/auth', require('./routes/auth'));
app.use(authenticateToken);
app.use('/device', require('./routes/adafruitRoutes'))

module.exports = app;
