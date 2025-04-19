// routes/controlRoutes.js
const express = require('express');
const router = express.Router();
const { controlDevice, limitOfDevice, graphDevice, getLimitOfDevice } = require('../controllers/controlController');

router.post('/control', controlDevice);
router.post('/limited', limitOfDevice)
router.get('/graph', graphDevice )
router.get('/limited', getLimitOfDevice)

module.exports = router;
