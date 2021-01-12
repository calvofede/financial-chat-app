const express = require('express');
const router = express.Router();
const { mustBeAuth } = require('../config/Auth');

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/chatroom', mustBeAuth, (req, res) => {
    res.render('chatroom',{
        user: req.user
    })
})

module.exports = router;
