const express = require('express');
const messageController = require('../components/message/message-controller');
const router = express.Router();
const { mustBeAuth } = require('../config/auth');

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/chatroom', mustBeAuth, (req, res) => {
    res.render('chatroom')
})

router.get('/messages', messageController.getMessages);

router.post('/messages', messageController.postMessage);

module.exports = router;
