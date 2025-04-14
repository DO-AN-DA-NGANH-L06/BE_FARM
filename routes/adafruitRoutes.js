// routes/controlRoutes.js
const express = require('express');
const router = express.Router();
const { controlDevice, limitOfDevice, graphDevice } = require('../controllers/controlController');

router.post('/control', controlDevice);
router.post('/limited', limitOfDevice)
router.get('/graph', graphDevice )

module.exports = router;
