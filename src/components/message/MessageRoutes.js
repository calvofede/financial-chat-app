const express = require('express');
const messageController = require('./MessageController');
const router = express.Router();

router.get('/messages', messageController.getMessages);

router.post('/messages', messageController.postMessage);

module.exports = router;