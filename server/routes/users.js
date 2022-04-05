const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {wrapAsync} = require('../utils/helper');

router.get('/users', wrapAsync(async function (req, res) {
    let user = await User.find({});
    res.json(user);
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

router.delete('/users/:id', wrapAsync(async function (req, res) {
    const id = req.params.id;
    const result = await User.findOneAndDelete(id);
    res.json(result);
}));

module.exports = router;