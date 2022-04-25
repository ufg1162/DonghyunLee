const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {wrapAsync} = require('../utils/helper');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.get('/users', wrapAsync(async function (req, res) {
    let user = await User.find({});
    res.json(user);
}));

router.post('/users/:id/file', upload.single('image'), wrapAsync(async function (req, res) {
    console.dir(req.file);
    res.json("File uploaded successfully");
}));

router.post('/users', wrapAsync(async function (req, res) {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        colorScheme: req.body.colorScheme,
    })
    await newUser.save();
    res.json(newUser);
}));

router.put('/users/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    const {name, email, colorScheme} = req.body;
    await User.findByIdAndUpdate(id, {name, email, colorScheme},
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

module.exports = router;