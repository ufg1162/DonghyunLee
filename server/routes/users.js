const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {wrapAsync} = require('../utils/helper');
const multer = require('multer');
const { isLoggedIn, isAuthorized } = require('../middleware/auth');
const upload = multer({dest: 'uploads/'});

router.get('/users', isLoggedIn, wrapAsync(async function (req, res) {
    let user = await User.find({"_id": req.session.userId});
    res.json(user);
}));

router.put('/users/:id', isAuthorized, wrapAsync(async function (req, res) {
    const id = req.params.id;
    const {name, email, profile_img, colorScheme} = req.body;
    await User.findByIdAndUpdate(id, {name, email, profile_img, colorScheme},
        {runValidators: true});
    res.sendStatus(204);
}));

router.post('/register', wrapAsync(async function (req, res) {
    const {password, email, name} = req.body;
    const user = new User({email, password, name})
    await user.save();
    req.session.userId = user._id;
    // Note: this is returning the entire user object to demo, which will include the hashed and salted password.
    // In practice, you wouldn't typically do this – a success status would suffice, or perhaps just the user id.
    res.json(user);
}));

router.post('/login', wrapAsync(async function (req, res) {
    const {password, email} = req.body;
    const user = await User.findAndValidate(email, password);
    if (user) {
        req.session.userId = user._id;
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
}));

router.post('/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
}));

router.post('/auth', wrapAsync(async function (req, res) {
    if(!req.session.userId) {
        res.json(false);
    }
    else {
        res.json(true);
    }
}))

module.exports = router;