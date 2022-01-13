const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
require('../auth/passport.js')(passport)

router.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    try {
        await User.addUser(newUser);
        res.json({success: true, msg: "User added"});
    }
    catch(e) {
        console.error(e);
        res.status(500).json({success: false, msg: "Something went wrong"});
    }
});

router.post('/authenticate', async (req, res) => {
    const username = req.body.username;
    const pswd = req.body.password;
    try {
        const user = await User.getUserByUsername(username);
        if (user) {
            if (await User.comparePassword(pswd, user.password)) {
                const token = await jwt.sign(user.toJSON(), process.env.SECRET, {
                    expiresIn: '1h'
                });
                res.json({
                    success: true,
                    token: "JWT "+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                res.status(403).json({success: false, msg: "Incorrect password"});
            }
        }
        else {
            res.status(404).json({success: false, msg: "User not found"});
        }
    }
    catch(e) {
        console.error(e);
        res.status(500).json({success: false, msg: "Something went wrong"});
    }
});

router.get('/profile', passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.json({user: req.user});
});

module.exports = router