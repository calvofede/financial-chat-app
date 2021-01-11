const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
})

router.post('/login', (req,res,next) => {
next(); 
},
(req, res, next) =>  passport.authenticate('local', {
    successRedirect: '/chatroom',
    failureRedirect: '/login',
    failureFlash: true,
})(req, res, next));

router.get('/logout', (req, res) => {
})

module.exports = router;