const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.json('login');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // 
}));

// 
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('http://localhost:3000/');
});

router.get('/user', (req, res) => {
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect("http://localhost:3000/");
});

module.exports = router;