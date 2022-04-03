const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/user', async function (req, res) {
    let user = await User.find({});
    res.json(user);
})

module.exports = router;